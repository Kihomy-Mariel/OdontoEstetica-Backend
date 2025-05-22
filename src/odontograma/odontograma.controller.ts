// src/odontograma/odontograma.controller.ts
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
import { OdontogramaService } from './odontograma.service';
import { CreateOdontogramaDto } from './dto/create-odontograma.dto';
import { UpdateOdontogramaDto } from './dto/update-odontograma.dto';
import { OdontogramaConDientesDto } from 'odontograma-detalle/dto/odontograma-con-dientes.dto';


@Controller('odontograma')
export class OdontogramaController {
  constructor(private readonly service: OdontogramaService) {}

  @Post()
  create(@Body() dto: CreateOdontogramaDto) {
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
    @Body() dto: UpdateOdontogramaDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  /** Odontogramas de un historial clínico dado */
  @Get('historial/:idHistorialClinico')
  findByHistorial(
    @Param('idHistorialClinico', ParseIntPipe) id: number,
  ) {
    return this.service.findByHistorial(id);
  }

    /** GET /odontogramas/historial/123 */
  @Get('historial/:idHistorial')
  getByHistorial(
    @Param('idHistorial', ParseIntPipe) id: number
  ): Promise<OdontogramaConDientesDto> {
    return this.service.findByHistorialWithDientes(id);
  }
  
}
