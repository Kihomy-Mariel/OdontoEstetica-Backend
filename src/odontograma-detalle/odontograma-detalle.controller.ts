// src/odontograma/odontograma-detalle.controller.ts
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
import { OdontogramaDetalleService } from './odontograma-detalle.service';
import { CreateOdontogramaDetalleDto } from './dto/create-odontograma-detalle.dto';
import { UpdateOdontogramaDetalleDto } from './dto/update-odontograma-detalle.dto';

@Controller('odontograma-detalle')
export class OdontogramaDetalleController {
  constructor(private readonly service: OdontogramaDetalleService) {}

  @Post()
  create(@Body() dto: CreateOdontogramaDetalleDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOdontogramaDetalleDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  /** Detalles de un odontograma dado */
  @Get('odontograma/:idOdontograma')
  findByOdontograma(
    @Param('idOdontograma', ParseIntPipe) id: number,
  ) {
    return this.service.findByOdontograma(id);
  }
}
