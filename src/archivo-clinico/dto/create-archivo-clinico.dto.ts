// src/archivo-clinico/dto/create-archivo-clinico.dto.ts
import { IsInt, IsString, IsDateString } from 'class-validator';

export class CreateArchivoClinicoDto {
  @IsInt()
  idHistorialClinico: number;

  @IsString()
  tipoArchivo: string;

  @IsString()
  URL: string;

  @IsDateString()
  fechaSubida: string;

  @IsString()
  observaciones: string;
}

