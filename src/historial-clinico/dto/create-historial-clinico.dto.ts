// src/historial-clinico/dto/create-historial-clinico.dto.ts
import { IsInt, IsDateString, IsString } from 'class-validator';

export class CreateHistorialClinicoDto {
  @IsInt()
  idPaciente: number;

  @IsDateString()
  fechaRegistroHistorial: string;

  @IsString()
  antecedentesMedicos: string;

  @IsString()
  antecedentesOdontologicos: string;

  @IsString()
  diagnostico: string;

  @IsString()
  tratamientoPropuesto: string;

  @IsString()
  tratamientoRealizado: string;

  @IsString()
  observaciones: string;

  @IsInt()
  edadEnConsulta: number;
}
