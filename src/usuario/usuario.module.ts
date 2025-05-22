// src/user/usuario.module.ts
import { Module, forwardRef }   from '@nestjs/common';
import { TypeOrmModule }        from '@nestjs/typeorm';

import { Usuario }              from './entities/usuario.entity';
import { Persona }              from '../persona/entities/persona.entity';
import { Paciente }             from '../paciente/entities/paciente.entity';
import { Empleado }             from '../empleado/entities/empleado.entity';

import { UsuarioService }       from './usuario.service';
import { AuthModule }           from '../auth/auth.module'; // si Auth consume UsuarioService
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [
    // <-- aquí exponemos los repositorios que inyectamos en UsuarioService
    TypeOrmModule.forFeature([
      Usuario,
      Persona,
      Paciente,
      Empleado,
    ]),
    // si AuthController/Service usa UsuarioService, hacemos esto:
    forwardRef(() => AuthModule),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
