import { Module } from '@nestjs/common';
import { ReciboService } from './recibo.service';
import { ReciboController } from './recibo.controller';

@Module({
  controllers: [ReciboController],
  providers: [ReciboService],
})
export class ReciboModule {}
