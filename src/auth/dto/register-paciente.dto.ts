// src/auth/dto/register-paciente.dto.ts
import { IsString, MinLength, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePersonaDto } from './create-persona.dto';
import { CreatePacienteDto } from './create-paciente.dto';

export class RegisterPacienteDto {
  @IsString() @MinLength(3)   username: string;
  @IsString() @MinLength(6)   password: string;
  @IsBoolean()                habilitado: boolean;

  @ValidateNested() @Type(() => CreatePersonaDto)
  persona: CreatePersonaDto;

  @ValidateNested() @Type(() => CreatePacienteDto)
  paciente: CreatePacienteDto;
}
