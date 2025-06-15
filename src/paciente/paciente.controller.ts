import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PacienteService} from './paciente.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePacienteFullDto } from './dto/update-paciente-full.dto';
import { Roles } from 'common/decorators/roles.decorator';
import { RolesGuard } from 'common/guards/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(5, 4, 3, 2, 1) // O los roles que quieras permitir
@Controller('pacientes')
export class PacienteController {
  constructor(
    private readonly pacienteService: PacienteService
  ) { }

  @Get()       /* roles opcionales con @Roles(...) */
  findAll() { return this.pacienteService.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.pacienteService.findOne(id); }
  @Patch(':idPaciente')
  async updatePaciente(
    @Param('idPaciente', ParseIntPipe) idPaciente: number,
    @Body() dto: UpdatePacienteFullDto
  ) {
    dto.idPaciente = idPaciente;
    return this.pacienteService.updatePaciente(dto);
  }


  @Delete(':idPaciente')
  async deletePaciente(@Param('idPaciente', ParseIntPipe) idPaciente: number) {
    return this.pacienteService.deletePaciente(idPaciente);
  }
}