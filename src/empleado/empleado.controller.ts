import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "common/decorators/roles.decorator";
import { RolesGuard } from "common/guards/roles.guard";
import { EmpleadoService } from "./empleado.service";

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(5,4,2,1)           // solo ADM
@Controller('empleados')
export class EmpleadoController {
  constructor(private readonly servicio: EmpleadoService) {}

  @Get()
  /* adm, asistente, etc. – agrega RolesGuard si ya lo tienes */
  getAll() {
    return this.servicio.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.servicio.findOne(id);
  }
}

