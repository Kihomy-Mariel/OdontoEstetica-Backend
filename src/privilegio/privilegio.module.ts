import { Module } from '@nestjs/common';
import { PrivilegioService } from './privilegio.service';
import { PrivilegioController } from './privilegio.controller';

@Module({
  controllers: [PrivilegioController],
  providers: [PrivilegioService],
})
export class PrivilegioModule {}
