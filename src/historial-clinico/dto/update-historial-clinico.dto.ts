import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialClinicoDto } from './create-historial-clinico.dto';

export class UpdateHistorialClinicoDto extends PartialType(CreateHistorialClinicoDto) {}
