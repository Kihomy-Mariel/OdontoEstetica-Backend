// src/auth/dto/create-empleado.dto.ts
import { IsString } from 'class-validator';

export class CreateEmpleadoDto {
  // idEmpleado es PK autogenerada
  @IsString()
  cargo: string;          // e.g. "ODONTOLOGO", "ASISTENTE", "AUXILIAR"

  @IsString()
  especialidad: string;   // p. ej. "Endodoncia", "Recepción", etc.

}
