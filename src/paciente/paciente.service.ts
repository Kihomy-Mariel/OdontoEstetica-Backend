import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, Repository } from 'typeorm';
import { Persona } from 'persona/entities/persona.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';

@Injectable()
export class PacienteService {
  constructor(@InjectRepository(Paciente) private repo: Repository<Paciente>) {}

  findAll() {
    return this.repo.find({
      where: { habilitado: true },
      relations: { persona: { usuario: true } },   // JOIN hasta usuario
      order:    { idPaciente: 'ASC' },
    });
  }

  async findOne(id: number) {
    const pac = await this.repo.findOne({
      where: { idPaciente: id },
      relations: { persona: { usuario: true } },
    });
    if (!pac) throw new NotFoundException('Paciente no existe');
    return pac;
  }
}
