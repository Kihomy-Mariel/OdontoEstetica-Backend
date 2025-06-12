import {
  IsInt,
  IsDateString,
  IsString,
  IsIn,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { CitaEstado } from '../entities/cita.entity';

export class CreateCitaDto {
  @IsInt()
  idPaciente: number;

  @IsInt()
  idAgenda: number;

  @IsIn(['disponible','reservado','cancelada'])
  @IsOptional()
  estado?: CitaEstado;

  @IsString()
  motivo: string;

  @IsDateString()
  fecha: string;

  @IsString()
  hora: string;

  @IsOptional()
  @IsBoolean()
  habilitado?: boolean;
}
