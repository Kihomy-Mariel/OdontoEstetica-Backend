import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioService } from '../usuario/usuario.service';    
import { LoginAuthDto } from './dto/login-auth.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { Usuario } from '../usuario/entities/usuario.entity';
import { CreateUsuarioDto } from 'usuario/dto/create-usuario.dto';
import { RegisterPacienteDto } from './dto/register-paciente.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService,
  ) { }

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



  @Post('register-paciente')
  async registerPaciente(@Body() dto: RegisterPacienteDto) {
    return this.authService.registerPaciente(dto);
  }

}
