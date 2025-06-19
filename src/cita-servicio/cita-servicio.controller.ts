// src/cita-servicio/cita-servicio.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CitaServicioService } from './cita-servicio.service';
import { CreateCitaServicioDto } from './dto/create-cita-servicio.dto';
import { UpdateCitaServicioDto } from './dto/update-cita-servicio.dto';

@Controller('cita-servicio')
export class CitaServicioController {
  constructor(private readonly service: CitaServicioService) {}

  @Post()
  create(@Body() dto: CreateCitaServicioDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':idCita/:idServicio')
  findOne(
    @Param('idCita', ParseIntPipe) idCita: number,
    @Param('idServicio', ParseIntPipe) idServicio: number,
  ) {
    return this.service.findOne(idCita, idServicio);
  }

  @Patch(':idCita/:idServicio')
  update(
    @Param('idCita', ParseIntPipe) idCita: number,
    @Param('idServicio', ParseIntPipe) idServicio: number,
    @Body() dto: UpdateCitaServicioDto,
  ) {
    return this.service.update(idCita, idServicio, dto);
  }

  @Delete(':idCita/:idServicio')
  remove(
    @Param('idCita', ParseIntPipe) idCita: number,
    @Param('idServicio', ParseIntPipe) idServicio: number,
  ) {
    return this.service.remove(idCita, idServicio);
  }

  @Get('cita/:idCita')
  findByCita(@Param('idCita', ParseIntPipe) idCita: number) {
    return this.service.findByCita(idCita);
  }
}
