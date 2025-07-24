import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterPacienteDto } from './dto/register-paciente.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string) {
    const user = await this.usuarioService.findByUsername(username);

    if (!user || !user.habilitado) {
      throw new UnauthorizedException('Usuario no encontrado o deshabilitado');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return user;
  }

  async login(user: any): Promise<LoginResponseDto> {
    /* ----- 1. PAYLOAD DEL TOKEN ----- */
    const payload = {
      sub: user.idUsuario,          // ← «sub» estándar
      username: user.username,
      idRol: user.rol?.idRol,         // 👈 ID numérico del rol  (lo usará RolesGuard)
      rol: user.rol?.nombre,        // (opcional) nombre para el frontend
    };

    /* ----- 2. FIRMAR EL TOKEN ----- */
    const token = this.jwtService.sign(payload);

    /* ----- 3. RESPUESTA AL FRONTEND ----- */
    return {
      token,                       // tu bearer token listo
      id: user.idUsuario,
      username: user.username,
      idRol: user.rol?.idRol, // (útil si el front lo quiere)
      rol: user.rol?.nombre,
      privilegios: user.rol?.rolPrivilegios?.map(rp => rp.privilegio?.nombre) ?? [],
      persona: {
       idPersona: user.persona?.idPersona || user.persona?.id,
        nombres: user.persona?.nombres,
        apellidoPaterno: user.persona?.apellidoPaterno,
        apellidoMaterno: user.persona?.apellidoMaterno,
        ci: user.persona?.ci,
        fechaNacimiento: user.persona?.fechaNacimiento,
        telefono: user.persona?.telefono,
        email: user.persona?.email,
        fechaRegistro: user.persona?.fechaRegistro,
      },
    };
  }


  async registerPaciente(dto: RegisterPacienteDto) {
    return this.usuarioService.crearUsuarioPaciente(dto);
  }



}

