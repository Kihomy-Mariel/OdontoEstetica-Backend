import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- IMPORTANTE
import { Recibo } from './entities/recibo.entity'; // <-- IMPORTANTE
import { ReciboService } from './recibo.service';
import { ReciboController } from './recibo.controller';
import { Pago } from 'pago/entities/pago.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recibo, Pago]) 
  ],
  controllers: [ReciboController],
  providers: [ReciboService],
  exports: [ReciboService], 
})
export class ReciboModule {}
