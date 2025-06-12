// src/historial-clinico/historial-clinico.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorialClinico } from './entities/historial-clinico.entity';
import { CreateHistorialClinicoDto } from './dto/create-historial-clinico.dto';
import { UpdateHistorialClinicoDto } from './dto/update-historial-clinico.dto';

@Injectable()
export class HistorialClinicoService {
  constructor(
    @InjectRepository(HistorialClinico)
    private readonly repo: Repository<HistorialClinico>,
  ) {}

  create(dto: CreateHistorialClinicoDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const hc = await this.repo.findOneBy({ idHistorialClinico: id });
    if (!hc) throw new NotFoundException('Historial no encontrado');
    return hc;
  }

  async update(id: number, dto: UpdateHistorialClinicoDto) {
    await this.findOne(id);
    return this.repo.update(id, dto);
  }

 /* async remove(id: number) {
    const hc = await this.findOne(id);
    return this.repo.remove(hc);
  } */
async findByPaciente(idPaciente: number) {
    return this.repo.find({
      where: { idPaciente },
      relations: ['paciente'],
      order: { fechaRegistroHistorial: 'DESC' },
    });
  }

  /** Obtener un historial concreto de un paciente */
  async findOneByPaciente(
    idPaciente: number,
    idHistorial: number,
  ) {
    return this.repo.findOne({
      where: {
        idPaciente,
        idHistorialClinico: idHistorial,
      },
      relations: ['paciente'],
    });
  }
}