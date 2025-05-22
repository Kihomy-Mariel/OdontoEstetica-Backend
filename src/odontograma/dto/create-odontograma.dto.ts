// src/odontograma/dto/create-odontograma.dto.ts
import { IsInt, IsString } from 'class-validator';

export class CreateOdontogramaDto {
  @IsInt()
  idHistorialClinico: number;

  @IsString()
  tipo: string;

  @IsString()
  descripcion: string;

  @IsString()
  archivoURL: string;
}

