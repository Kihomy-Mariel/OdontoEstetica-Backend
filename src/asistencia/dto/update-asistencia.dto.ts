// src/asistencia/dto/update-asistencia.dto.ts
import { IsInt, IsOptional, IsIn, Matches } from 'class-validator';

export class UpdateAsistenciaDto {
  // ────────── PK “vieja” llega por URL ──────────
  // idEmpleado, idTurno, diaSemana → en los @Param

  // ─────── posibles nuevos valores (opcionales) ───────
  @IsOptional()
  @IsInt()
  newIdEmpleado?: number;

  @IsOptional()
  @IsInt()
  newIdTurno?: number;

  @IsOptional()
  @IsIn(['lunes','martes','miercoles','jueves','viernes','sabado','domingo'])
  newDiaSemana?: string;

  // ────────── columnas normales ──────────
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/)
  horaLlegada?: string;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/)
  horaSalida?: string;
}
