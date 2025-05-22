// src/odontograma/odontograma.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Odontograma } from './entities/odontograma.entity';
import { CreateOdontogramaDto } from './dto/create-odontograma.dto';
import { UpdateOdontogramaDto } from './dto/update-odontograma.dto';
import { OdontogramaConDientesDto } from 'odontograma-detalle/dto/odontograma-con-dientes.dto';

@Injectable()
export class OdontogramaService {
  constructor(
    @InjectRepository(Odontograma)
    private readonly repo: Repository<Odontograma>,
  ) {}

  create(dto: CreateOdontogramaDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find({ relations: ['historial', 'detalles'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { idOdontograma: id },
      relations: ['historial', 'detalles'],
    });
  }

  update(id: number, dto: UpdateOdontogramaDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  /** Todos los odontogramas de un historial clínico */
  findByHistorial(idHistorialClinico: number) {
    return this.repo.find({
      where: { idHistorialClinico },
      relations: ['historial', 'detalles'],
      order: { idOdontograma: 'ASC' },
    });
  }

    /** Devuelve un odontograma con su array “dientes” */
  async findByHistorialWithDientes(idHistorial: number): Promise<OdontogramaConDientesDto> {
    const odonto = await this.repo.findOne({
      where: { idHistorialClinico: idHistorial },
      relations: ['detalles'],  // gracias a eager: true quizá no lo necesites
    });
    if (!odonto) throw new NotFoundException('No existe odontograma para ese historial');

    return {
      idOdontograma: odonto.idOdontograma,
      tipo: odonto.tipo,
      descripcion: odonto.descripcion,
      archivoURL: odonto.archivoURL,
      dientes: odonto.detalles.map(d => ({
        numero: parseInt(d.numeroPiezaDental, 10),
        estado: d.estado,
      })),
    };
  }

}
