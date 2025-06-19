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
  constructor(private readonly citaService: CitaService) {}

  @Post()
  create(@Body() dto: CreateCitaDto) {
    return this.citaService.create(dto);
  }

  @Get()
  findAll() {
    return this.citaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.citaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCitaDto,
  ) {
    return this.citaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.citaService.remove(id);
  }

  @Get('paciente/:idPaciente')
  async findByPaciente(@Param('idPaciente', ParseIntPipe) id: number) {
    return this.citaService.findByPaciente(id);
  }

  @Get('agenda/:idAgenda')
  async findByAgenda(@Param('idAgenda', ParseIntPipe) id: number) {
    return this.citaService.findByAgenda(id);
  }
  
}
