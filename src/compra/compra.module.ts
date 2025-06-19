import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compra } from './entities/compra.entity';
import { Empleado } from '../empleado/entities/empleado.entity';
import { Proveedor } from '../proveedor/entities/proveedor.entity';
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Compra, Empleado, Proveedor])],
  controllers: [CompraController],
  providers: [CompraService],
})
export class CompraModule {}
