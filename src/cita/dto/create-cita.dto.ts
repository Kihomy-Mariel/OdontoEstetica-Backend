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

  @IsOptional()
  @IsIn(['PENDIENTE', 'CONFIRMADA', 'CANCELADA'])
  estado?: CitaEstado = 'CONFIRMADA';

  @IsString()
  motivo: string;

  @IsDateString()
  fecha: string;

  @IsString()
  hora: string;

}
