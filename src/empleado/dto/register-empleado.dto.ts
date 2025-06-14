import { IsString, MinLength, IsBoolean, ValidateNested, IsInt } from 'class-validator'; // <--- agrega IsInt
import { Type } from 'class-transformer';
import { CreatePersonaDto } from 'auth/dto/create-persona.dto';
import { CreateEmpleadoDto } from './create-empleado.dto';

export class RegisterEmpleadoDto {
  @IsString() @MinLength(3)   username: string;
  @IsString() @MinLength(6)   password: string;
  @IsBoolean()                habilitado: boolean;

  @IsInt()                    idRol: number; // <--- aquí va el rol (1,2,4,5)

  @ValidateNested() @Type(() => CreatePersonaDto)
  persona: CreatePersonaDto;

  @ValidateNested() @Type(() => CreateEmpleadoDto)
  empleado: CreateEmpleadoDto; // <--- ojo, antes decía "paciente", debe ser "empleado"
}
