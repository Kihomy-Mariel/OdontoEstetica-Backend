// src/cita-servicio/dto/create-cita-servicio.dto.ts
import { IsInt, IsString, IsNumber, Min } from 'class-validator';

export class CreateCitaServicioDto {
  @IsInt()
  idCita: number;

  @IsInt()
  idServicio: number;

  @IsNumber({ maxDecimalPlaces: 2 }, {
    message: 'precioAplicado debe ser un número decimal válido con hasta 2 decimales.'
  })
  precioAplicado: number;

  @IsInt()
  @Min(1, { message: 'La cantidad de servicio debe ser al menos 1.' })
  cantidadServicio: number;

  @IsString()
  observaciones: string;
}

