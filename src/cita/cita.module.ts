// src/cita/cita.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitaService } from './cita.service';
import { CitaController } from './cita.controller';
import { Cita } from './entities/cita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cita])],
  providers: [CitaService],
  controllers: [CitaController],
  exports: [CitaService],
})
export class CitaModule {}
