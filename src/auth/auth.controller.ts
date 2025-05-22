// src/auth/auth.controller.ts

import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService }         from './auth.service';
import { UsuarioService }      from '../usuario/usuario.service';    // ajusta ruta relativa
import { LoginAuthDto }        from './dto/login-auth.dto';
import { LoginResponseDto }    from './dto/login-response.dto';
// Nuevo DTO completo
import { CreateUsuarioCompletoDto } from './dto/create-usuario-completo.dto';
import { Usuario }             from '../usuario/entities/usuario.entity';
import { CreateUsuarioDto } from 'usuario/dto/create-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginAuthDto): Promise<LoginResponseDto> {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.authService.login(user);
  }

  @Post('register')   // El registro “light” al usuario sólo
  @HttpCode(HttpStatus.CREATED)
  async registrar(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<Partial<Usuario>> {
    const usuario = await this.usuarioService.crear(createUsuarioDto);
    const { password, ...rest } = usuario;
    return rest;
  }

// src/auth/auth.controller.ts

  @Post('register-full')
  @HttpCode(HttpStatus.CREATED)
  async registrarCompleto(
    @Body() dto: CreateUsuarioCompletoDto,
  ): Promise<Partial<Usuario>> {
    try {
      const usuario = await this.usuarioService.crearCompleto(dto);
      const { password, ...rest } = usuario;
      return rest;
    } catch (err) {
      console.error('🔥 Error en register-full:', err);
      throw err;
    }
  }
}
