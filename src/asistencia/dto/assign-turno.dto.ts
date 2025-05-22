// src/asistencia/dto/assign-turno.dto.ts
import { IsIn, IsInt, IsString, Matches } from 'class-validator';

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/; // HH:MM o HH:MM:SS

export class AssignTurnoDto {
  @IsInt()
  idEmpleado: number;

  @IsInt()
  idTurno: number;
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'horaLlegada formato HH:mm' })
  horaLlegada: string;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'horaSalida formato HH:mm' })
  horaSalida: string;

  @IsIn(['lunes','martes','miercoles','jueves','viernes','sabado','domingo'])
  diaSemana: string;
}
