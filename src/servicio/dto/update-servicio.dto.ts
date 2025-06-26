import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateServicioDto {
  @IsOptional()
  @IsString()
  nombreServicio?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsString()
  duracionEstimada?: string;

  @IsOptional()
  @IsBoolean()
  habilitado?: boolean;

}
