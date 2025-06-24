// src/cita-servicio/cita-servicio.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CitaServicio } from './entities/cita-servicio.entity';
import { CreateCitaServicioDto } from './dto/create-cita-servicio.dto';
import { UpdateCitaServicioDto } from './dto/update-cita-servicio.dto';

@Injectable()
export class CitaServicioService {
  constructor(
    @InjectRepository(CitaServicio)
    private readonly repo: Repository<CitaServicio>,
  ) { }

  async create(dto: CreateCitaServicioDto) {
    const citaServicio = this.repo.create(dto);
    return this.repo.save(citaServicio);
  }

  findAll() {
    return this.repo.find({ where: { habilitado: true }, relations: ['cita', 'servicio'] });
  }

  async findOne(idCita: number, idServicio: number) {
    const citaServicio = await this.repo.findOneBy({ idCita, idServicio });
    if (!citaServicio) {
      throw new NotFoundException(`Servicio con idServicio ${idServicio} en cita ${idCita} no encontrado`);
    }
    return citaServicio;
  }

  async update(idCita: number, idServicio: number, dto: UpdateCitaServicioDto) {
    await this.repo.update({ idCita, idServicio }, dto);
    return this.findOne(idCita, idServicio);
  }

  async remove(idCita: number, idServicio: number) {
    const citaServicio = await this.repo.findOneBy({ idCita, idServicio });
    if (!citaServicio) {
      throw new NotFoundException(`Servicio con idServicio ${idServicio} en cita ${idCita} no encontrado`);
    }
    // Elimina lógicamente
    citaServicio.habilitado = false;
    await this.repo.save(citaServicio);
    return { message: `Servicio con idServicio ${idServicio} en cita ${idCita} deshabilitado (eliminación lógica)` };
  }


  findByCita(idCita: number) {
    return this.repo.find({ where: { idCita, habilitado: true } });
  }
}
