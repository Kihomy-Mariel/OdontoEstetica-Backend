// src/odontograma-detalle/dto/create-odontograma-detalle.dto.ts
import { IsEnum, IsNumber, IsString } from 'class-validator';

export enum EstadoDiente {
  SANO      = 'sano',
  CARIES    = 'caries',
  OBTURADO  = 'obturado',
  EXTRAIDO  = 'extraido',
  CORONA    = 'corona',
  ENDODONCIA= 'endodoncia',
}

export class CreateOdontogramaDetalleDto {
  @IsNumber()
  idOdontograma: number;

  @IsString()
  numeroPiezaDental: string;

  @IsEnum(EstadoDiente)
  estado: EstadoDiente;

  @IsString()
  observaciones: string;
}
