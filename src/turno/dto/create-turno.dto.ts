// create-turno.dto.ts
import { IsString, IsBoolean, Matches } from 'class-validator';

export class CreateTurnoDto {
  @IsString()
  nombreTurno: string;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'Hora inválida (HH:mm)' })
  horaInicio: string;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'Hora inválida (HH:mm)' })
  horaFin: string;

  @IsBoolean()
  habilitado: boolean;
}
