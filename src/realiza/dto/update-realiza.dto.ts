import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRealizaDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  observaciones?: string;
}
