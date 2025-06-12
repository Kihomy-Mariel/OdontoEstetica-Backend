import {
  IsDateString,
  IsString,
  IsIn,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateAgendaDto {
  @IsDateString()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  horaInicio: string;

  @IsString()
  @IsNotEmpty()
  horaFin: string;

  @IsIn(['reservada', 'disponible', 'cancelada'])
  estado: string;

  @IsString()
  observaciones: string;

  @IsOptional()
  @IsBoolean()
  habilitado?: boolean;
}
