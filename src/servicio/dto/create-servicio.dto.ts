import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateServicioDto {
  @IsString()
  nombreServicio: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  precio: number;

  @IsString()
  duracionEstimada: string;

  @IsBoolean()
  readonly habilitado: boolean;
}
