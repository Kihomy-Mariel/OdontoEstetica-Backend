// src/auth/dto/create-persona.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDateString,
  IsOptional,
  IsMobilePhone,
  IsBoolean,
} from 'class-validator';

export class CreatePersonaDto {
  @IsString() @IsNotEmpty()       nombres: string;
  @IsString() @IsNotEmpty()       apellidoPaterno: string;
  @IsString() @IsNotEmpty()       apellidoMaterno: string;
  @IsString() @IsNotEmpty()       ci: string;
  @IsDateString()                  fechaNacimiento: string;
  @IsMobilePhone('es-BO')          telefono: string;
  @IsEmail() @IsNotEmpty()         email: string;
  //@IsBoolean()                     habilitado: boolean;
  // fechaRegistro la ponemos en el servicio automáticamente
  // idUsuario se asigna después al crear la entidad
}
