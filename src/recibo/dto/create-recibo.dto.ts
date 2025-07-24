import {
  IsDateString,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateReciboDto {
  @IsNotEmpty()
  @IsNumber()
  idPago: number;

  @IsNotEmpty()
  @IsDateString()
  fechaEmision: string;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '0,2' })
  monto: string; // ✅ debe ser string

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '0,2' })
  saldoPendiente: string; // ✅ debe ser string

  @IsOptional()
  @IsString()
  observaciones: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  estado: string;
}
