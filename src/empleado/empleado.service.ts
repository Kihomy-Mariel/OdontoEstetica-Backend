import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Empleado } from './entities/empleado.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterEmpleadoDto } from './dto/register-empleado.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { UpdateEmpleadoFullDto } from './dto/update-empleado-full.dto';
import { Persona } from '../persona/entities/persona.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Rol } from '../rol/entities/rol.entity';

@Injectable()
export class EmpleadoService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly dataSource: DataSource,
    @InjectRepository(Empleado)
    private readonly empleadoRepo: Repository<Empleado>,
  ) { }

  /* Todos los empleados + persona + usuario  */
  findAll() {
    return this.empleadoRepo.find({
      relations: {
        persona: { usuario: true },   // JOIN   persona → usuario
      },
      where: { habilitado: true },
      order: { idEmpleado: 'ASC' },
    });
  }

  /* Uno por id */
  async findOne(id: number) {
    const empleado = await this.empleadoRepo.findOne({
      where: { idEmpleado: id },
      relations: { persona: { usuario: true } },
    });
    if (!empleado) throw new NotFoundException('Empleado no existe');
    return empleado;
  }

  async registerEmpleado(dto: RegisterEmpleadoDto) {
    return this.usuarioService.crearUsuarioEmpleado(dto);
  }

  async updateEmpleado(dto: UpdateEmpleadoFullDto): Promise<any> {
    return this.dataSource.transaction(async manager => {
      // 1. Buscar el empleado y sus relaciones
      const empleadoRepo = manager.getRepository(Empleado);
      const personaRepo = manager.getRepository(Persona);
      const usuarioRepo = manager.getRepository(Usuario);
      const rolRepo = manager.getRepository(Rol);


      const empleado = await empleadoRepo.findOne({
        where: { idEmpleado: dto.idEmpleado },
        relations: { persona: { usuario: true } },
      });

      if (!empleado) throw new NotFoundException('Empleado no encontrado');

      // 2. Actualizar persona si hay datos
      if (dto.persona) {
        Object.assign(empleado.persona, dto.persona);
        await personaRepo.save(empleado.persona);
      }

      // 3. Actualizar usuario si hay datos
      if (dto.usuario) {
        const { idRol, username, password } = dto.usuario;

        if (idRol) {
          const rolRepo = manager.getRepository(Rol);
          const nuevoRol = await rolRepo.findOne({ where: { idRol } });
          if (!nuevoRol) throw new NotFoundException('Rol no encontrado');
          empleado.persona.usuario.rol = nuevoRol;
        }

        if (username) {
          empleado.persona.usuario.username = username;
        }

        if (password) {
          empleado.persona.usuario.password = password;
        }

        await usuarioRepo.save(empleado.persona.usuario);
      }


      // 4. Actualizar empleado si hay datos
      if (dto.empleado) {
        Object.assign(empleado, dto.empleado);
        await empleadoRepo.save(empleado);
      }

      // 5. Retornar actualizado
      return empleadoRepo.findOne({
        where: { idEmpleado: dto.idEmpleado },
        relations: { persona: { usuario: true } },
      });
    });
  }

  async deleteEmpleado(idEmpleado: number): Promise<string> {
    return this.dataSource.transaction(async manager => {
      const empleadoRepo = manager.getRepository(Empleado);
      const personaRepo = manager.getRepository(Persona);
      const usuarioRepo = manager.getRepository(Usuario);

      const empleado = await empleadoRepo.findOne({
        where: { idEmpleado },
        relations: { persona: { usuario: true } },
      });
      if (!empleado) throw new NotFoundException('Empleado no encontrado');


      // *** VALIDACIÓN: Impedir borrar si usuario es ADM ***
      const usuario = empleado.persona.usuario;
      if (usuario?.rol?.idRol === 5) {
        throw new BadRequestException('No se puede eliminar un usuario con rol Administrador (ADM)');
      }

      // Borrado lógico en cascada
      empleado.habilitado = false;
      await empleadoRepo.save(empleado);

      empleado.persona.habilitado = false;
      await personaRepo.save(empleado.persona);

      empleado.persona.usuario.habilitado = false;
      await usuarioRepo.save(empleado.persona.usuario);

      return 'Empleado, persona y usuario deshabilitados correctamente.';
    });
  }

}

