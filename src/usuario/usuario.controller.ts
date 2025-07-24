import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from '@nestjs/passport';

// src/usuario/usuario.controller.ts
//@UseGuards(AuthGuard('jwt'))
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Get()
  findAll() { return this.usuarioService.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.usuarioService.findOne(id); }

  @Delete(':idUsuario')
  async deleteUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.usuarioService.deleteUsuario(idUsuario);
  }

}

