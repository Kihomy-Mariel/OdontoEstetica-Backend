// src/auth/dto/create-paciente.dto.ts
import { IsString,  IsOptional } from 'class-validator';

export class CreatePacienteDto {
  // idPaciente se genera automáticamente
  @IsString()
  @IsOptional()
  alergias?: string;


}
