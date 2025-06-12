// src/agenda/agenda.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agenda } from './entities/agenda.entity';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private readonly repo: Repository<Agenda>,
  ) {}

  create(dto: CreateAgendaDto) {
    const agenda = this.repo.create(dto);
    return this.repo.save(agenda); 11 
  }

  findAll() {
    return this.repo.find({ order: { fecha: 'ASC', horaInicio: 'ASC' } });
  }

  async findOne(id: number) {
    const agenda = await this.repo.findOne({ where: { idAgenda: id } });
    if (!agenda) {
      throw new NotFoundException(`Agenda con id ${id} no encontrada`);
    }
    return agenda;
  }

  async update(id: number, dto: UpdateAgendaDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Agenda con id ${id} no encontrada`);
    }
    return { message: `Agenda con id ${id} eliminada` };
  }
}
