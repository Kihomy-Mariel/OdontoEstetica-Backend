// src/odontograma/odontograma-detalle.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository }              from '@nestjs/typeorm';
import { Repository }                    from 'typeorm';
import { OdontogramaDetalle }            from './entities/odontograma-detalle.entity';
import { CreateOdontogramaDetalleDto }   from './dto/create-odontograma-detalle.dto';
import { UpdateOdontogramaDetalleDto }   from './dto/update-odontograma-detalle.dto';

@Injectable()
export class OdontogramaDetalleService {
  constructor(
    @InjectRepository(OdontogramaDetalle)
    private readonly repo: Repository<OdontogramaDetalle>,
  ) {}

  /** Crea un nuevo detalle, usando repo.create para mapear el DTO a la entidad */
  async create(dto: CreateOdontogramaDetalleDto): Promise<OdontogramaDetalle> {
    const detalle = this.repo.create(dto);
    return this.repo.save(detalle);
  }

  /** Todos los detalles, con su odontograma */
  findAll(): Promise<OdontogramaDetalle[]> {
    return this.repo.find({ relations: ['odontograma'] });
  }

  /** Un detalle por su ID */
  async findOne(id: number): Promise<OdontogramaDetalle> {
    const detalle = await this.repo.findOne({
      where: { idDetalle: id },
      relations: ['odontograma'],
    });
    if (!detalle) throw new NotFoundException(`Detalle ${id} no existe`);
    return detalle;
  }

  /** Actualiza un detalle y retorna la entidad actualizada */
  async update(
    id: number,
    dto: UpdateOdontogramaDetalleDto,
  ): Promise<OdontogramaDetalle> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  /** Elimina un detalle */
  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  /** Todos los detalles de un odontograma dado */
  findByOdontograma(idOdontograma: number): Promise<OdontogramaDetalle[]> {
    return this.repo.find({
      where: { idOdontograma },
      relations: ['odontograma'],
      order: { idDetalle: 'ASC' },
    });
  }
}
