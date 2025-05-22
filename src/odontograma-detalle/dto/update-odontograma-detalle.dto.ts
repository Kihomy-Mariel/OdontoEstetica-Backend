// src/odontograma-detalle/dto/update-odontograma-detalle.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateOdontogramaDetalleDto, EstadoDiente } from './create-odontograma-detalle.dto';

export class UpdateOdontogramaDetalleDto extends PartialType(CreateOdontogramaDetalleDto) {
  // hereda todas las propiedades, pero opcionales.
}
