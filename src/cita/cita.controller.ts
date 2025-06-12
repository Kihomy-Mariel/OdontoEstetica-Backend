import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { CitaService } from './cita.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';

@Controller('citas')
export class CitaController {
  constructor(private readonly service: CitaService) {}

  @Post()
  async create(@Body() dto: CreateCitaDto) {
    return this.service.create(dto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCitaDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Get('paciente/:idPaciente')
  async findByPaciente(@Param('idPaciente', ParseIntPipe) id: number) {
    return this.service.findByPaciente(id);
  }

  @Get('agenda/:idAgenda')
  async findByAgenda(@Param('idAgenda', ParseIntPipe) id: number) {
    return this.service.findByAgenda(id);
  }
}
