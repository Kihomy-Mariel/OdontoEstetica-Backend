// src/archivo-clinico/archivo-clinico.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchivoClinicoService } from './archivo-clinico.service';
import { ArchivoClinicoController } from './archivo-clinico.controller';
import { ArchivoClinico } from './entities/archivo-clinico.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArchivoClinico]),  // <-- Registramos el repositorio aquí
  ],
  providers: [ArchivoClinicoService],
  controllers: [ArchivoClinicoController],
  exports: [ArchivoClinicoService],
})
export class ArchivoClinicoModule {}
