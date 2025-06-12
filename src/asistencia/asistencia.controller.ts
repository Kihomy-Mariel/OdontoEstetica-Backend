import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, SetMetadata, Injectable, UseGuards, ExecutionContext, CanActivate } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { AuthGuard } from '@nestjs/passport';
import { AssignTurnoDto } from './dto/assign-turno.dto';
import { RolesGuard } from 'common/guards/roles.guard';
import { Roles } from 'common/decorators/roles.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('asistencias')
export class AsistenciaController {
  constructor(private readonly servicio: AsistenciaService) { }

  /** Solo Admin (5) o Asistente (2) */
  @Post()
  @Roles(5, 2)
  async asignar(@Body() dto: AssignTurnoDto) {
    return this.servicio.assignTurno(dto);
  }

  @Delete(':idEmpleado/:idTurno/:dia')
  @Roles(5, 2)
  remove(
    @Param('idEmpleado', ParseIntPipe) idEmpleado: number,
    @Param('idTurno', ParseIntPipe) idTurno: number,
    @Param('dia') diaSemana: string,
  ) {
    return this.servicio.remove(idEmpleado, idTurno, diaSemana);
  }

  /** Odontólogo, Auxiliar o Admin pueden ver su propia agenda */
  @Get('empleado/:idEmpleado')
  @Roles(1, 4, 5, 2)   // ajustar según tu tabla ROL
  getAgenda(@Param('idEmpleado', ParseIntPipe) idEmpleado: number) {
    return this.servicio.findByEmpleado(idEmpleado);
  }

  @Patch(':idEmpleado/:idTurno/:diaSemana')
  @Roles(5, 2)                       // Admin, Asistente
  update(
    @Param('idEmpleado', ParseIntPipe) idEmpleado: number,
    @Param('idTurno', ParseIntPipe) idTurno: number,
    @Param('diaSemana') diaSemana: string,
    @Body() dto: UpdateAsistenciaDto,
  ) {
    return this.servicio.updateAsignacion(idEmpleado, idTurno, diaSemana, dto);
  }

  /** Listar todas las asistencias (Admin, Asistente) */
  @Get()
  @Roles(5, 2)
  getAll() {
    return this.servicio.findAll();
  }

}

