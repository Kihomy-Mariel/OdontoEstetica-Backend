import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turno } from './entities/turno.entity';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';

@Injectable()
export class TurnoService {
  constructor(
    @InjectRepository(Turno)
    private readonly repo: Repository<Turno>,
  ) {}

  create(dto: CreateTurnoDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find({ where: { habilitado: true } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ idTurno: id });
  }

  update(id: number, dto: UpdateTurnoDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.update(id, { habilitado: false });
  }
}
