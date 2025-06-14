import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { UpdatePacienteFullDto } from './dto/update-paciente-full.dto';
import { Usuario } from 'usuario/entities/usuario.entity';
import { Repository, DataSource } from 'typeorm';
import { Persona } from 'persona/entities/persona.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>,
    private readonly dataSource: DataSource,
  ) { }

  findAll() {
    return this.pacienteRepo.find({
      where: { habilitado: true },
      relations: { persona: { usuario: true } },   // JOIN hasta usuario
      order: { idPaciente: 'ASC' },
    });
  }

  async findOne(id: number) {
    const pac = await this.pacienteRepo.findOne({
      where: { idPaciente: id },
      relations: { persona: { usuario: true } },
    });
    if (!pac) throw new NotFoundException('Paciente no existe');
    return pac;
  }

  async updatePaciente(dto: UpdatePacienteFullDto): Promise<any> {
    return this.dataSource.transaction(async manager => {
      const pacienteRepo = manager.getRepository(Paciente);
      const personaRepo = manager.getRepository(Persona);
      const usuarioRepo = manager.getRepository(Usuario);

      const paciente = await pacienteRepo.findOne({
        where: { idPaciente: dto.idPaciente },
        relations: { persona: { usuario: true } },
      });
      if (!paciente) throw new NotFoundException('Paciente no encontrado');

      if (dto.persona) {
        Object.assign(paciente.persona, dto.persona);
        await personaRepo.save(paciente.persona);
      }

      if (dto.usuario) {
        Object.assign(paciente.persona.usuario, dto.usuario);
        await usuarioRepo.save(paciente.persona.usuario);
      }

      if (dto.paciente) {
        Object.assign(paciente, dto.paciente);
        await pacienteRepo.save(paciente);
      }

      return pacienteRepo.findOne({
        where: { idPaciente: dto.idPaciente },
        relations: { persona: { usuario: true } },
      });
    });
  }

  async deletePaciente(idPaciente: number): Promise<string> {
    return this.dataSource.transaction(async manager => {
      const pacienteRepo = manager.getRepository(Paciente);
      const personaRepo = manager.getRepository(Persona);
      const usuarioRepo = manager.getRepository(Usuario);

      const paciente = await pacienteRepo.findOne({
        where: { idPaciente },
        relations: { persona: { usuario: true } },
      });
      if (!paciente) throw new NotFoundException('Paciente no encontrado');

    // *** VALIDACIÓN: Impedir borrar si usuario es ADM ***
      const usuario = paciente.persona.usuario;
      if (usuario?.rol?.idRol === 5) {
        throw new BadRequestException('No se puede eliminar un usuario con rol Administrador (ADM)');
      }
      // Borrado lógico en cascada
      paciente.habilitado = false;
      await pacienteRepo.save(paciente);

      paciente.persona.habilitado = false;
      await personaRepo.save(paciente.persona);

      paciente.persona.usuario.habilitado = false;
      await usuarioRepo.save(paciente.persona.usuario);

      return 'Paciente, persona y usuario deshabilitados correctamente.';
    });
  }
}
