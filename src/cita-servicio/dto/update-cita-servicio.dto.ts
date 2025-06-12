// src/cita-servicio/dto/update-cita-servicio.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCitaServicioDto } from './create-cita-servicio.dto';

export class UpdateCitaServicioDto extends PartialType(CreateCitaServicioDto) {}
