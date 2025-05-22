import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './entities/servicio.entity';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Servicio)
    private readonly repo: Repository<Servicio>,
  ) {}

create(dto: CreateServicioDto) {
  return this.repo.save(dto);
}

  findAll() {
    return this.repo.find({ where: { habilitado: true } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ idServicio: id });
  }

  update(id: number, dto: UpdateServicioDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.update(id, { habilitado: false });
  }
}
