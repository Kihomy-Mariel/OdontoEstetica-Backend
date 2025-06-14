// src/empleado/dto/update-empleado-full.dto.ts
import { IsOptional, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateUsuarioDto } from 'usuario/dto/update-usuario.dto';
import { UpdatePersonaDto } from 'persona/dto/update-persona.dto';
import { UpdateEmpleadoDto } from './update-empleado.dto';

export class UpdateEmpleadoFullDto {
  @IsInt()
  @IsOptional()
  idEmpleado?: number; // requerido para identificar a quién actualizar

  @ValidateNested() @Type(() => UpdateUsuarioDto)
  @IsOptional()
  usuario?: UpdateUsuarioDto;

  @ValidateNested() @Type(() => UpdatePersonaDto)
  @IsOptional()
  persona?: UpdatePersonaDto;

  @ValidateNested() @Type(() => UpdateEmpleadoDto)
  @IsOptional()
  empleado?: UpdateEmpleadoDto;
}
