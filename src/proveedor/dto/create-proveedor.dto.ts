import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProveedorDto {
  @IsInt()
  idProveedor: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombreCompleto: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  direccion: string;

  @IsInt()
  telefono: number;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsOptional()
  @IsInt()
  habilitado?: number;
}
