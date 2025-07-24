import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class DetalleCompraDto {
  @IsInt()
  idProducto: number;

  @IsInt()
  cantidad: number;

  @IsNumber()
  precioUnitario: number;
}

export class CreateCompraDto {
  @IsInt()
  idEmpleado: number;

  @IsInt()
  idProveedor: number;

  @IsDateString()
  fechaCompra: string; // formato ISO: "YYYY-MM-DD"

  @IsString()
  estado: string;


  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleCompraDto)
  detalles: DetalleCompraDto[];
}
