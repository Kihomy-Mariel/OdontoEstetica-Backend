import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export enum EstadoCompra {
  PENDIENTE = 'pendiente',
  COMPLETADO = 'completado',
  CANCELADO = 'cancelado',
}

export class CreateCompraDto {
  @IsNotEmpty()
  @IsNumber()
  idEmpleado: number;

  @IsNotEmpty()
  @IsNumber()
  idProveedor: number;

  @IsOptional()
  @IsString()
  nombreProducto?: string;

  @IsNotEmpty()
  @IsDateString()
  fechaCompra: string;

  @IsNotEmpty()
  @IsEnum(EstadoCompra)
  estado: EstadoCompra;

  @IsNotEmpty()
  @IsNumber()
  precioTotalCompra: number;
}