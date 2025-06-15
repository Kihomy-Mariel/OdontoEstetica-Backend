import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

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
