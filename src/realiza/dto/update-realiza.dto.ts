import { PartialType } from '@nestjs/mapped-types';
import { CreateRealizaDto } from './create-realiza.dto';

export class UpdateRealizaDto extends PartialType(CreateRealizaDto) {}
