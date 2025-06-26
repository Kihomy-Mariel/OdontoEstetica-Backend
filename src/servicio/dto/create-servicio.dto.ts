import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateServicioDto {
  @IsString()
  nombreServicio: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  precio: number;

  @IsString()
  duracionEstimada: string;


}
