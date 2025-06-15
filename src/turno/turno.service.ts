import { Injectable, NotFoundException } from '@nestjs/common';
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

async update(id: number, dto: UpdateTurnoDto) {
  const turno = await this.repo.findOneBy({ idTurno: id });
  if (!turno) throw new NotFoundException('Turno no encontrado');

  Object.assign(turno, dto); // <-- actualiza solo lo enviado

  return this.repo.save(turno);
}


  remove(id: number) {
    return this.repo.update(id, { habilitado: false });
  }
}
