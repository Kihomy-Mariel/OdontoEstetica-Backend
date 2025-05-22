import { forwardRef, Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { Turno } from 'turno/entities/turno.entity';
import { Empleado } from 'empleado/entities/empleado.entity';
import { EmpleadoModule } from 'empleado/empleado.module';
import { TurnoModule } from 'turno/turno.module';


// src/asistencia/asistencia.module.ts
@Module({
  imports: [
    TypeOrmModule.forFeature([Asistencia, Turno, Empleado]),
    forwardRef(() => EmpleadoModule),   // si AsistenciaService necesita EmpleadoService
    forwardRef(() => TurnoModule),
  ],
  providers: [AsistenciaService],
  controllers: [AsistenciaController],
})
export class AsistenciaModule {}
