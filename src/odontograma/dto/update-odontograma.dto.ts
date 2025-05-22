// src/odontograma/dto/update-odontograma.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateOdontogramaDto } from './create-odontograma.dto';

export class UpdateOdontogramaDto extends PartialType(CreateOdontogramaDto) {}
