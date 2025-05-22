// src/cita/cita.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './entities/cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita)
    private readonly repo: Repository<Cita>,
  ) {}

  create(dto: CreateCitaDto) {
    // Aquí creamos la cita usando solo los campos que vienen,
    // el resto (estado, habilitado, idAgenda) toma los defaults de la entidad.
    const cita = this.repo.create({
      idPaciente: dto.idPaciente,
      fecha: dto.fecha,
      hora: dto.hora,
      motivo: dto.motivo,
      // estado = 'PENDIENTE' por default en la entidad
      // idAgenda = null, habilitado = true por default
    });
    return this.repo.save(cita);
  }

  findAll() {
    return this.repo.find({ order: { fecha: 'ASC', hora: 'ASC' } });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { idCita: id } });
  }

  update(id: number, dto: UpdateCitaDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  findByPaciente(idPaciente: number) {
    return this.repo.find({
      where: { idPaciente },
      order: { fecha: 'ASC', hora: 'ASC' },
    });
  }

  findByAgenda(idAgenda: number) {
    return this.repo.find({
      where: { idAgenda },
      order: { fecha: 'ASC', hora: 'ASC' },
    });
  }
}
