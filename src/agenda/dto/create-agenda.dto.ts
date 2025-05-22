// src/agenda/dto/create-agenda.dto.ts
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateAgendaDto {
  @IsDateString()
  fecha: string;

  @IsNotEmpty()
  @IsString()
  horaInicio: string; // 'HH:mm:ss' o 'HH:mm'

  @IsNotEmpty()
  @IsString()
  horaFin: string;

  @IsString()
  estado: string;

  @IsString()
  observaciones: string;

  // habilitado lo dejaremos true por defecto, no viene en el DTO
}
