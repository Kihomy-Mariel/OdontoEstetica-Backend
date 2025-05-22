// src/agenda/agenda.service.ts
import { Injectable } from '@nestjs/common';
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
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find({ where: { habilitado: true } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ idAgenda: id });
  }

  update(id: number, dto: UpdateAgendaDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.update(id, { habilitado: false });
  }
}
