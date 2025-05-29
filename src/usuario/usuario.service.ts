
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Persona } from '../persona/entities/persona.entity';
import { Paciente } from '../paciente/entities/paciente.entity';
import { RegisterPacienteDto } from 'auth/dto/register-paciente.dto';
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
    private readonly dataSource: DataSource,
  ) {}

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
  async crearUsuarioPaciente(dto: RegisterPacienteDto): Promise<{ usuario: Usuario, paciente: Paciente }> {
    const idRolPaciente = 3; // Cambia si tu id real es otro

    return this.dataSource.transaction(async manager => {
      // Validar username único
      if (await manager.getRepository(Usuario).findOne({ where: { username: dto.username } })) {
        throw new ConflictException('El username ya está en uso');
      }

      // 1. Crear Usuario (solo con rol paciente)
      const hash = await bcrypt.hash(dto.password, 10);
      const usuario = manager.getRepository(Usuario).create({
        username: dto.username,
        password: hash,
        habilitado: dto.habilitado,
        rol: { idRol: idRolPaciente } as any,
      });
      const savedUsuario = await manager.getRepository(Usuario).save(usuario);

      // 2. Crear Persona (asociada al usuario)
      const persona = manager.getRepository(Persona).create({
        ...dto.persona,
        fechaNacimiento: new Date(dto.persona.fechaNacimiento),
        fechaRegistro: new Date(),
        habilitado: dto.habilitado,
        usuario: savedUsuario,
      });
      const savedPersona = await manager.getRepository(Persona).save(persona);

      // 3. Crear Paciente (asociado a persona)
      const paciente = manager.getRepository(Paciente).create({
        ...dto.paciente,
        habilitado: dto.habilitado,
        persona: savedPersona,
      });
      const savedPaciente = await manager.getRepository(Paciente).save(paciente);

      // Opcional: puedes devolver lo que necesites
      return {
        usuario: savedUsuario,
        paciente: savedPaciente,
      };
    });
  }
}
