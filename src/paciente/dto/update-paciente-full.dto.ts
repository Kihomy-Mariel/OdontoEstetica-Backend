import { IsOptional, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateUsuarioDto } from 'usuario/dto/update-usuario.dto';
import { UpdatePersonaDto } from 'persona/dto/update-persona.dto';
import { UpdatePacienteDto } from './update-paciente.dto';

export class UpdatePacienteFullDto {
  @IsOptional()
  @IsInt()
  idPaciente?: number;

  @ValidateNested() @Type(() => UpdateUsuarioDto)
  @IsOptional()
  usuario?: UpdateUsuarioDto;

  @ValidateNested() @Type(() => UpdatePersonaDto)
  @IsOptional()
  persona?: UpdatePersonaDto;

  @ValidateNested() @Type(() => UpdatePacienteDto)
  @IsOptional()
  paciente?: UpdatePacienteDto;
}
