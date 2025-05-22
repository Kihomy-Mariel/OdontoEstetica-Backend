// src/odontograma/odontograma-detalle.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OdontogramaDetalleService } from './odontograma-detalle.service';
import { OdontogramaDetalleController } from './odontograma-detalle.controller';
import { OdontogramaDetalle } from './entities/odontograma-detalle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OdontogramaDetalle]),
  ],
  providers: [OdontogramaDetalleService],
  controllers: [OdontogramaDetalleController],
  exports: [OdontogramaDetalleService],
})
export class OdontogramaDetalleModule {}
