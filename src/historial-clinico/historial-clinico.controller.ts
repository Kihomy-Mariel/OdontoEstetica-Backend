// src/historial-clinico/historial-clinico.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  //Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { HistorialClinicoService } from './historial-clinico.service';
import { CreateHistorialClinicoDto } from './dto/create-historial-clinico.dto';
import { UpdateHistorialClinicoDto } from './dto/update-historial-clinico.dto';

@Controller('historial-clinico')
export class HistorialClinicoController {
  constructor(
    private readonly service: HistorialClinicoService,
  ) {}

  @Post()
  create(@Body() dto: CreateHistorialClinicoDto) {
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
    @Body() dto: UpdateHistorialClinicoDto,
  ) {
    return this.service.update(id, dto);
  }

/*  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  } */
  // --- NUEVAS RUTAS ---
  /** Listar solo los historiales de un paciente */
  @Get('paciente/:idPaciente')
  findByPaciente(
    @Param('idPaciente', ParseIntPipe) idPaciente: number,
  ) {
    return this.service.findByPaciente(idPaciente);
  }

  /** Obtener un historial concreto de ese paciente */
  @Get('paciente/:idPaciente/:idHistorial')
  findOneByPaciente(
    @Param('idPaciente', ParseIntPipe) idPaciente: number,
    @Param('idHistorial', ParseIntPipe) idHistorial: number,
  ) {
    return this.service.findOneByPaciente(idPaciente, idHistorial);
  }
}
