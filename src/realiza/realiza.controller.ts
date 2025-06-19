import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { RealizaService } from './realiza.service';
import { CreateRealizaDto } from './dto/create-realiza.dto';
import { UpdateRealizaDto } from './dto/update-realiza.dto';

@Controller('realiza')
export class RealizaController {
  constructor(private readonly service: RealizaService) { }

  // --- rutas específicas primero ---
  @Get('empleado/:idEmpleado/servicios')
  findByEmpleado(@Param('idEmpleado', ParseIntPipe) idEmpleado: number) {
    return this.service.findByEmpleado(idEmpleado);
  }

  @Post()
  create(@Body() dto: CreateRealizaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }


  @Patch(':idEmpleado/:idServicio')
  update(
    @Param('idEmpleado', ParseIntPipe) idEmpleado: number,
    @Param('idServicio', ParseIntPipe) idServicio: number,
    @Body() dto: UpdateRealizaDto,
  ) {
    return this.service.update(idEmpleado, idServicio, dto);
  }

  @Delete(':idEmpleado/:idServicio')
  remove(
    @Param('idEmpleado', ParseIntPipe) idEmpleado: number,
    @Param('idServicio', ParseIntPipe) idServicio: number,
  ) {
    return this.service.remove(idEmpleado, idServicio);
  }


  @Get(':idEmpleado/:idServicio')
  findOne(
    @Param('idEmpleado', ParseIntPipe) idEmpleado: number,
    @Param('idServicio', ParseIntPipe) idServicio: number,
  ) {
    return this.service.findOne(idEmpleado, idServicio);
  }

  @Get('servicio/:idServicio/empleados')
  findByServicio(@Param('idServicio', ParseIntPipe) idServicio: number) {
    return this.service.findByServicio(idServicio);
  }

  @Get('servicios-con-odontologos')
  getServiciosConOdontologos() {
    return this.service.getServiciosConOdontologos();
  }


}
