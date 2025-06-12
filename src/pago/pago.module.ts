import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { Pago } from './entities/pago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pago])],
  controllers: [PagoController],
  providers: [PagoService],
})
export class PagoModule {}
