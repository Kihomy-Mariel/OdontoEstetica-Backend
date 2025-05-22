import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsBoolean,
  IsInt
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsBoolean()
  readonly habilitado: boolean;

  @IsInt()
  readonly idRol: number;
}
