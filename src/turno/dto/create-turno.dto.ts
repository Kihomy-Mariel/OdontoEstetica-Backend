// create-turno.dto.ts
import { IsString, IsBoolean, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTurnoDto {
  @IsString()
  nombreTurno: string;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'Hora inválida (HH:mm)' })
  horaInicio: string;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'Hora inválida (HH:mm)' })
  horaFin: string;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === undefined) return true;          // Valor por defecto
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  habilitado: boolean;
}
