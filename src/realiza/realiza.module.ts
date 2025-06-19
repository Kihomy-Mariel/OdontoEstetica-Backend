import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Realiza } from './entities/realiza.entity';
import { RealizaService } from './realiza.service';
import { RealizaController } from './realiza.controller';
import { Empleado } from 'empleado/entities/empleado.entity';
import { Servicio } from 'servicio/entities/servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Realiza, Empleado, Servicio])],
  controllers: [RealizaController],
  providers: [RealizaService],
})
export class RealizaModule {}
