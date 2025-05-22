// src/historial-clinico/historial-clinico.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialClinico } from './entities/historial-clinico.entity';
import { HistorialClinicoService } from './historial-clinico.service';
import { HistorialClinicoController } from './historial-clinico.controller';
import { ArchivoClinico } from 'archivo-clinico/entities/archivo-clinico.entity';
import { Odontograma } from 'odontograma/entities/odontograma.entity';
import { OdontogramaDetalle } from 'odontograma-detalle/entities/odontograma-detalle.entity';
import { ArchivoClinicoController } from 'archivo-clinico/archivo-clinico.controller';
import { OdontogramaController } from 'odontograma/odontograma.controller';
import { OdontogramaDetalleController } from 'odontograma-detalle/odontograma-detalle.controller';
import { ArchivoClinicoService } from 'archivo-clinico/archivo-clinico.service';
import { OdontogramaService } from 'odontograma/odontograma.service';
import { OdontogramaDetalleService } from 'odontograma-detalle/odontograma-detalle.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArchivoClinico,
      Odontograma,
      OdontogramaDetalle,
      HistorialClinico,
    ]),
  ],
  controllers: [
    ArchivoClinicoController,
    OdontogramaController,
    OdontogramaDetalleController,
    HistorialClinicoController,
  ],
  providers: [
    ArchivoClinicoService,
    OdontogramaService,
    OdontogramaDetalleService,
    HistorialClinicoService,
  ],
})
export class HistorialClinicoModule {}

