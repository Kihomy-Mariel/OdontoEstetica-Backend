import { IsDateString, IsDecimal, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreatePagoDto {
  @IsDateString()
  fechaPago: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'montoPagado debe ser un número válido' })
  montoPagado: number;
  
  @IsString()
  @MaxLength(50)
  formaPago: string;

  @IsString()
  @MaxLength(20)
  estado: string;

  @IsNumber()
  idCita: number;
}
