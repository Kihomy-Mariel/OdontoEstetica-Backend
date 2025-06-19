import { IsInt, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateRealizaDto {
  @IsInt()
  idEmpleado: number;

  @IsInt()
  idServicio: number;

  @IsString()
  observaciones: string;

  @IsOptional()
  @IsBoolean()
  habilitado?: boolean = true;
}
