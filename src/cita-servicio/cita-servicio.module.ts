import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitaServicioService } from './cita-servicio.service';
import { CitaServicioController } from './cita-servicio.controller';
import { CitaServicio } from './entities/cita-servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CitaServicio])],
  providers: [CitaServicioService],
  controllers: [CitaServicioController],
  exports: [CitaServicioService],
})
export class CitaServicioModule {}
