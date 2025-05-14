import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(user: any) {
    const payload = {
      sub: user.idUsuario,
      username: user.username,
      rol: user.rol?.nombre,
    };

    return {
      token: this.jwtService.sign(payload),
      id: user.idUsuario,
      username: user.username,
      rol: user.rol?.nombre,
      nombre: user.persona?.nombres,
      apellido: user.persona?.apellidoPaterno,
      privilegios: user.rol?.rolPrivilegios?.map((rp) => rp.privilegio?.nombre) || [],
    };
  }
}
