
import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Persona } from '../persona/entities/persona.entity';
import { Paciente } from '../paciente/entities/paciente.entity';
import { RegisterPacienteDto } from 'auth/dto/register-paciente.dto';
import { Empleado } from '../empleado/entities/empleado.entity';
import { RegisterEmpleadoDto } from 'empleado/dto/register-empleado.dto';


const ROLES_EMPLEADO = [1, 2, 4, 5];
@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepo: Repository<Usuario>,
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
        'persona',     
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

  //empleado
  async crearUsuarioEmpleado(dto: RegisterEmpleadoDto): Promise<{ usuario: Usuario, empleado: Empleado }> {
    // Validar que idRol sea válido para empleado
    if (!ROLES_EMPLEADO.includes(dto.idRol)) {
      throw new ConflictException('El idRol proporcionado no corresponde a un empleado válido.');
    }

    return this.dataSource.transaction(async manager => {
      // Validar username único
      if (await manager.getRepository(Usuario).findOne({ where: { username: dto.username } })) {
        throw new ConflictException('El username ya está en uso');
      }

      // 1. Crear Usuario
      const hash = await bcrypt.hash(dto.password, 10);
      const usuario = manager.getRepository(Usuario).create({
        username: dto.username,
        password: hash,
        habilitado: dto.habilitado,
        rol: { idRol: dto.idRol } as any,
      });
      const savedUsuario = await manager.getRepository(Usuario).save(usuario);

      // 2. Crear Persona
      const persona = manager.getRepository(Persona).create({
        ...dto.persona,
        fechaNacimiento: new Date(dto.persona.fechaNacimiento),
        fechaRegistro: new Date(),
        habilitado: dto.habilitado,
        usuario: savedUsuario,
      });
      const savedPersona = await manager.getRepository(Persona).save(persona);

      // 3. Crear Empleado
      const empleado = manager.getRepository(Empleado).create({
        ...dto.empleado,
        habilitado: dto.habilitado,
        persona: savedPersona,
      });
      const savedEmpleado = await manager.getRepository(Empleado).save(empleado);

      return {
        usuario: savedUsuario,
        empleado: savedEmpleado,
      };
    });
  }

  async deleteUsuario(idUsuario: number): Promise<string> {
    return this.dataSource.transaction(async manager => {
      const userRepo = manager.getRepository(Usuario);
      const personaRepo = manager.getRepository(Persona);

      const usuario = await userRepo.findOne({
        where: { idUsuario },
        relations: { persona: true },
      });
      if (!usuario) throw new NotFoundException('Usuario no encontrado');

      // *** VALIDACIÓN: Impedir borrar si usuario es ADM ***
      if (usuario.rol?.idRol === 5) {
        throw new BadRequestException('No se puede eliminar un usuario con rol Administrador (ADM)');
      }
      
      usuario.habilitado = false;
      await userRepo.save(usuario);

      if (usuario.persona) {
        usuario.persona.habilitado = false;
        await personaRepo.save(usuario.persona);
      }

      return 'Usuario y persona deshabilitados correctamente.';
    });
  }

}
