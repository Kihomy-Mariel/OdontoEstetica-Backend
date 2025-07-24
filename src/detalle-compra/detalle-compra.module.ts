import { Module } from '@nestjs/common';
import { DetalleCompraService } from './detalle-compra.service';
import { DetalleCompraController } from './detalle-compra.controller';

@Module({
  controllers: [DetalleCompraController],
  providers: [DetalleCompraService],
})
export class DetalleCompraModule {}
