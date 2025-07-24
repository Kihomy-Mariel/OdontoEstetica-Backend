import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './entities/pago.entity';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
  ) { }

  create(createPagoDto: CreatePagoDto): Promise<Pago> {
    const pago = this.pagoRepository.create(createPagoDto);
    return this.pagoRepository.save(pago);
  }

  findAll(): Promise<Pago[]> {
    return this.pagoRepository.find({
      order: { fechaPago: 'DESC' },
      relations: ['cita',
        'cita.paciente',
        'cita.paciente.persona',
        'cita.agenda',
        'cita.citaServicios',
        'cita.citaServicios.servicio',
        'recibos'],
    });
  }

  async findOne(id: number): Promise<Pago> {
    const pago = await this.pagoRepository.findOne({
      where: { idPago: id },
      order: { fechaPago: 'DESC' },
      relations: ['cita',
        'cita.paciente',
        'cita.paciente.persona',
        'cita.agenda',
        'cita.citaServicios',
        'cita.citaServicios.servicio',
        'recibos'],
    });

    if (!pago) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }
    return pago;
  }



  async update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    await this.pagoRepository.update(id, updatePagoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.pagoRepository.delete(id);
  }


  // pago.service.ts
  async findByCita(idCita: number) {
    return this.pagoRepository.find({
      where: { idCita },
      order: { fechaPago: 'DESC' },
      relations: ['cita',
        'cita.paciente',
        'cita.paciente.persona',
        'cita.agenda',
        'cita.citaServicios',
        'cita.citaServicios.servicio',
        'recibos'],
    });
  }

}
