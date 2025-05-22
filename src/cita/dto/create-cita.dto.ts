import {
  IsInt,
  IsDateString,
  IsString,
  IsIn,
  IsOptional,
  IsBooleanString,
} from 'class-validator';
import { CitaEstado } from '../entities/cita.entity';

export class CreateCitaDto {
  @IsInt()
  idPaciente: number;


  @IsIn(['PENDIENTE','CONFIRMADA','CANCELADA'])
  @IsOptional()
  estado?: CitaEstado;

  @IsString()
  motivo: string;

  @IsDateString()
  fecha: string;

  @IsString()
  hora: string;

  @IsOptional()
  @IsBooleanString()
  habilitado?: boolean;
}
