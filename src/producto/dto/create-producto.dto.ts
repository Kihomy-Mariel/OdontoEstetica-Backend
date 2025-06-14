import { IsString, IsInt, IsNotEmpty, MaxLength, Min } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombreProducto: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsInt()
  @Min(0)
  stockActual: number;

  @IsInt()
  @Min(0)
  stockMinimo: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  unidadMedida: string;
}
