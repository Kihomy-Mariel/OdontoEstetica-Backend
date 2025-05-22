// src/auth/auth.module.ts
import { Module, forwardRef }        from '@nestjs/common';
import { JwtModule }                 from '@nestjs/jwt';
import { PassportModule }            from '@nestjs/passport';

import { AuthController }            from './auth.controller';
import { AuthService }               from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsuarioModule } from 'usuario/usuario.module';
import { jwtConstants } from './constants/jwt.constants';// tu secreto

@Module({
  imports: [
    // Para poder inyectar UsuarioService en AuthService
    forwardRef(() => UsuarioModule),

    // Passport para la estrategia jwt
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // Configuración de JwtModule
    JwtModule.register({
      secret: jwtConstants.secret,           // define en constants/jwt.constants.ts
      signOptions: { expiresIn: '1h' },      // o el tiempo que necesites
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,       // tu estrategia que valida el token
  ],
  exports: [
    AuthService,
    JwtModule,         // exportas JwtModule para poder validar tokens desde otros módulos
  ],
})
export class AuthModule {}
