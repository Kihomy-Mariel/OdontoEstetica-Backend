import { IsOptional, IsBoolean, IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTurnoDto {
  @IsOptional()
  @IsString()
  nombreTurno?: string;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'Hora inválida (HH:mm)' })
  horaInicio?: string;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'Hora inválida (HH:mm)' })
  horaFin?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  habilitado?: boolean;
}
