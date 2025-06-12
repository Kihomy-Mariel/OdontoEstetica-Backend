import { Injectable, NotFoundException } from '@nestjs/common';
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
    const cita = this.repo.create(dto);
    return this.repo.save(cita);
  }

  findAll() {
    return this.repo.find({ order: { fecha: 'ASC', hora: 'ASC' } });
  }

  async findOne(id: number) {
    const cita = await this.repo.findOne({ where: { idCita: id } });
    if (!cita) {
      throw new NotFoundException(`Cita con id ${id} no encontrada`);
    }
    return cita;
  }

  async update(id: number, dto: UpdateCitaDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cita con id ${id} no encontrada`);
    }
    return { message: `Cita con id ${id} eliminada` };
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
