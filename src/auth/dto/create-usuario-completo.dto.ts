// src/auth/dto/create-usuario-completo.dto.ts
import {
  IsString, MinLength, IsBoolean, IsInt,
  ValidateNested, ValidateIf
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreatePersonaDto }   from './create-persona.dto';
import { CreatePacienteDto }  from './create-paciente.dto';
import { CreateEmpleadoDto } from 'empleado/dto/create-empleado.dto';

export class CreateUsuarioCompletoDto {
  @IsString() @MinLength(3)   username: string;
  @IsString() @MinLength(6)   password: string;
  @IsBoolean()                 habilitado: boolean;
  @IsInt()                     idRol: number;

  @ValidateNested() @Type(() => CreatePersonaDto)
  persona: CreatePersonaDto;

  @ValidateIf(o => o.idRol === /* el id de Paciente */ 3)
  @ValidateNested() @Type(() => CreatePacienteDto)
  paciente?: CreatePacienteDto;

  @ValidateIf(o => [1,2,4].includes(o.idRol))
  @ValidateNested() @Type(() => CreateEmpleadoDto)
  empleado?: CreateEmpleadoDto;
}
