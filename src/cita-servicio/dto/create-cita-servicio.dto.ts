// src/cita-servicio/dto/create-cita-servicio.dto.ts
import { IsInt, IsDecimal, IsString, IsNotEmpty } from 'class-validator';

export class CreateCitaServicioDto {
  @IsInt()
  idCita: number;

  @IsInt()
  idServicio: number;

  @IsDecimal()
  precioAplicado: number;

  @IsInt()
  cantidadServicio: number;

  @IsString()
  @IsNotEmpty()
  observaciones: string;
}

