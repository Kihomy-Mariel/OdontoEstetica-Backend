// src/archivo-clinico/dto/update-archivo-clinico.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateArchivoClinicoDto } from './create-archivo-clinico.dto';

export class UpdateArchivoClinicoDto extends PartialType(CreateArchivoClinicoDto) {}
