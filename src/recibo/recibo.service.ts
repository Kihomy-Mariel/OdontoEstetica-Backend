// src/recibo/recibo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recibo } from './entities/recibo.entity';
import { Pago } from '../pago/entities/pago.entity';
import { CreateReciboDto } from './dto/create-recibo.dto';
import { UpdateReciboDto } from './dto/update-recibo.dto';

@Injectable()
export class ReciboService {
  constructor(
    @InjectRepository(Recibo)
    private readonly reciboRepository: Repository<Recibo>,

    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
  ) { }

  async create(createReciboDto: CreateReciboDto): Promise<Recibo> {
    const pago = await this.pagoRepository.findOne({
      where: { idPago: createReciboDto.idPago },
    });

    if (!pago) {
      throw new NotFoundException(`Pago con id ${createReciboDto.idPago} no encontrado`);
    }

    const recibo = this.reciboRepository.create({
      pago,
      fechaEmision: createReciboDto.fechaEmision,
      observaciones: createReciboDto.observaciones,
      estado: createReciboDto.estado,
      monto: parseFloat(createReciboDto.monto),
      saldoPendiente: parseFloat(createReciboDto.saldoPendiente),
    });


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

  async findByPago(idPago: number): Promise<Recibo | null> {
    return this.reciboRepository.findOne({
      where: { pago: { idPago } },
      relations: [
        'pago',
        'pago.cita',
        'pago.cita.paciente',
        'pago.cita.paciente.persona',
        'pago.cita.citaServicios',
        'pago.cita.citaServicios.servicio',
      ],
      order: { fechaEmision: 'DESC' },
    });

  }

  async update(id: number, updateReciboDto: UpdateReciboDto): Promise<Recibo> {
    await this.reciboRepository.update(id, {
      ...updateReciboDto,
      monto: updateReciboDto.monto ? parseFloat(updateReciboDto.monto) : undefined,
      saldoPendiente: updateReciboDto.saldoPendiente ? parseFloat(updateReciboDto.saldoPendiente) : undefined,
    });

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.reciboRepository.delete(id);
  }
}
