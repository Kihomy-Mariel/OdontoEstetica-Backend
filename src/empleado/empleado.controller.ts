import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "common/decorators/roles.decorator";
import { RolesGuard } from "common/guards/roles.guard";
import { EmpleadoService } from "./empleado.service";
import { RegisterEmpleadoDto } from "./dto/register-empleado.dto";
import { CreateUsuarioDto } from "usuario/dto/create-usuario.dto";
import { Usuario } from "usuario/entities/usuario.entity";
import { UsuarioService } from "usuario/usuario.service";
import { UpdateEmpleadoFullDto } from "./dto/update-empleado-full.dto";

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(5, 4, 2, 1)           // solo ADM
@Controller('empleados')
export class EmpleadoController {
  constructor(
    private readonly empleadoService: EmpleadoService,
    private readonly usuarioService: UsuarioService, // Ajusta según tu estructura

  ) { }

  @Get()
  /* adm, asistente, etc. – agrega RolesGuard si ya lo tienes */
  getAll() {
    return this.empleadoService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.empleadoService.findOne(id);
  }

  @Post('register-empleado')
  async registerEmplea(@Body() dto: RegisterEmpleadoDto) {
    return this.empleadoService.registerEmpleado(dto);
  }

  // src/empleado/empleado.controller.ts
  @Patch(':idEmpleado')
  async updateEmpleado(
    @Param('idEmpleado', ParseIntPipe) idEmpleado: number,
    @Body() dto: UpdateEmpleadoFullDto
  ) {
    // Sobreescribe idEmpleado en dto para seguridad
    dto.idEmpleado = idEmpleado;
    return this.empleadoService.updateEmpleado(dto);
  }

  @Delete(':idEmpleado')
  async deleteEmpleado(@Param('idEmpleado', ParseIntPipe) idEmpleado: number) {
    return this.empleadoService.deleteEmpleado(idEmpleado);
  }

}

