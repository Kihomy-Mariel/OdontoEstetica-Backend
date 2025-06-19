import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitaServicioService } from './cita-servicio.service';
import { CitaServicioController } from './cita-servicio.controller';
import { CitaServicio } from './entities/cita-servicio.entity';
import { Cita } from 'cita/entities/cita.entity';
import { Servicio } from 'servicio/entities/servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CitaServicio, Cita, Servicio])],
  providers: [CitaServicioService],
  controllers: [CitaServicioController],
  exports: [CitaServicioService],
})
export class CitaServicioModule {}
