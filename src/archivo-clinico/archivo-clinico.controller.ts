// src/archivo-clinico/archivo-clinico.controller.ts
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
import { ArchivoClinicoService } from './archivo-clinico.service';
import { CreateArchivoClinicoDto } from './dto/create-archivo-clinico.dto';
import { UpdateArchivoClinicoDto } from './dto/update-archivo-clinico.dto';

@Controller('archivo-clinico')
export class ArchivoClinicoController {
  constructor(private readonly service: ArchivoClinicoService) {}

  @Post()
  create(@Body() dto: CreateArchivoClinicoDto) {
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
    @Body() dto: UpdateArchivoClinicoDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Get('historial/:idHistorial')
  findByHistorial(@Param('idHistorial', ParseIntPipe) id: number) {
    return this.service.findByHistorial(id);
  }
}
