import { PartialType } from '@nestjs/mapped-types';
import { CreateReciboDto } from './create-recibo.dto';

export class UpdateReciboDto extends PartialType(CreateReciboDto) {}
