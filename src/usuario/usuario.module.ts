import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioService } from "./usuario.service";
import { Module } from "@nestjs/common";
import { Usuario } from "./entities/usuario.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
