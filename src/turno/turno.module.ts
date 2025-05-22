import { Module } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './entities/turno.entity';

// src/turno/turno.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([Turno])],
  providers: [TurnoService],
  controllers: [TurnoController],
  exports: [TurnoService],
})
export class TurnoModule {}
