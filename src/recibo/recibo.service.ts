// src/recibo/recibo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recibo } from './entities/recibo.entity';
import { CreateReciboDto } from './dto/create-recibo.dto';
import { UpdateReciboDto } from './dto/update-recibo.dto';

@Injectable()
export class ReciboService {
  constructor(
    @InjectRepository(Recibo)
    private readonly reciboRepository: Repository<Recibo>
  ) {}

  async create(createReciboDto: CreateReciboDto): Promise<Recibo> {
    const recibo = this.reciboRepository.create(createReciboDto);
    return this.reciboRepository.save(recibo);
  }

  async findAll(): Promise<Recibo[]> {
    return this.reciboRepository.find({
      order: { fechaEmision: 'DESC' },
      relations: [
        'pago',
        'pago.cita',
        'pago.cita.paciente',
        'pago.cita.paciente.persona',
        'pago.cita.citaServicios',
        'pago.cita.citaServicios.servicio'
      ],
    });
  }

  async findOne(id: number): Promise<Recibo> {
    const recibo = await this.reciboRepository.findOne({
      where: { idRecibo: id },
      relations: [
        'pago',
        'pago.cita',
        'pago.cita.paciente',
        'pago.cita.paciente.persona',
        'pago.cita.citaServicios',
        'pago.cita.citaServicios.servicio'
      ],
    });
    if (!recibo) throw new NotFoundException(`Recibo con id ${id} no encontrado`);
    return recibo;
  }

  async update(id: number, updateReciboDto: UpdateReciboDto): Promise<Recibo> {
    await this.reciboRepository.update(id, updateReciboDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.reciboRepository.delete(id);
  }
}
