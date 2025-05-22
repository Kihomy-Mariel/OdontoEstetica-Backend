import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from '@nestjs/passport';

// src/usuario/usuario.controller.ts
@UseGuards(AuthGuard('jwt'))
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly s: UsuarioService) {}

  @Get()
  findAll() { return this.s.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.s.findOne(id); }
}

