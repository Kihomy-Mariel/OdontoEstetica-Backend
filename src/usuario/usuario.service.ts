
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { CreateUsuarioCompletoDto } from '../auth/dto/create-usuario-completo.dto';
import { Persona } from '../persona/entities/persona.entity';
import { Paciente } from '../paciente/entities/paciente.entity';
import { Empleado } from '../empleado/entities/empleado.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepo: Repository<Usuario>,

    @InjectRepository(Persona)
    private readonly personaRepo: Repository<Persona>,

    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>,

    @InjectRepository(Empleado)
    private readonly empleadoRepo: Repository<Empleado>,

    private readonly dataSource: DataSource,
  ) { }

    findAll() {
    return this.userRepo.find({
      relations: { persona: true, rol: true },
      order: { idUsuario: 'ASC' },
    });
  }

  findOne(id: number) {
    return this.userRepo.findOne({
      where: { idUsuario: id },
      relations: { persona: true, rol: true },
    });
  }

  async findByUsername(username: string) {
    return this.userRepo.findOne({
      where: { username },
      relations: [
        'persona',                //  sigue funcionando
        'rol',
        'rol.rolPrivilegios',
        'rol.rolPrivilegios.privilegio',
      ],
    });
  }


  /** Crea un usuario “simple” (solo tabla usuario) */
  async crear(dto: CreateUsuarioDto): Promise<Usuario> {
    if (await this.userRepo.findOne({ where: { username: dto.username } })) {
      throw new ConflictException('El username ya está en uso');
    }
    const hash = await bcrypt.hash(dto.password, 10);
    const usuario = this.userRepo.create({
      username: dto.username,
      password: hash,
      habilitado: dto.habilitado,
      rol: { idRol: dto.idRol } as any,
    });
    return this.userRepo.save(usuario);
  }

  /**
   * Registro completo en transacción:
   * 1) Usuario
   * 2) Persona (one-to-one)
   * 3) INSERT puro en Paciente o Empleado
   */
  async crearCompleto(dto: CreateUsuarioCompletoDto): Promise<Usuario> {
    return this.dataSource.transaction(async manager => {
      // 1) Username único
      if (await manager.findOne(Usuario, { where: { username: dto.username } })) {
        throw new ConflictException('El username ya está en uso');
      }

      // 2) Hashear y guardar Usuario
      const hash = await bcrypt.hash(dto.password, 10);
      const nuevoUser = manager.getRepository(Usuario).create({
        username: dto.username,
        password: hash,
        habilitado: dto.habilitado,
        rol: { idRol: dto.idRol } as any,
      });
      const savedUser = await manager.getRepository(Usuario).save(nuevoUser);

      // 3) Crear y guardar Persona
      const personaEntity = manager.getRepository(Persona).create({
        ...dto.persona,
        fechaNacimiento: new Date(dto.persona.fechaNacimiento),
        fechaRegistro: new Date(),
        habilitado: dto.habilitado,
        usuario: savedUser,        // ← aquí, no idUsuario
      });

      const savedPersona = await manager.getRepository(Persona).save(personaEntity);

      // 4) Insert puro en Paciente o Empleado
      if (dto.paciente) {
        await manager.query(
          `INSERT INTO paciente (alergias, habilitado, idPersona)
   VALUES (?, ?, ?)`,
          [dto.paciente.alergias, dto.habilitado, savedPersona.idPersona],
        );

      } else if (dto.empleado) {
        await manager.query(
          `INSERT INTO empleado (cargo, especialidad, habilitado, idPersona)
   VALUES (?, ?, ?, ?)`,
          [dto.empleado.cargo,
          dto.empleado.especialidad,
          dto.habilitado,
          savedPersona.idPersona],   // ← este sí tiene valor
        );

      }

      // 5) Adjuntar persona al usuario y devolver
      savedUser.persona = savedPersona;
      return savedUser;
    });
  }
}
