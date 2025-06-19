// src/cita/cita.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from 'paciente/entities/paciente.entity';
import { Agenda } from 'agenda/entities/agenda.entity';
import { CitaServicio } from 'cita-servicio/entities/cita-servicio.entity';
import { CitaService } from './cita.service';
import { CitaController } from './cita.controller';
import { Cita } from './entities/cita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cita, Paciente, Agenda, CitaServicio])],
  providers: [CitaService],
  controllers: [CitaController],
  exports: [CitaService],
})
export class CitaModule {}
