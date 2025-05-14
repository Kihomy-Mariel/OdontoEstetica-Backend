import { Module } from '@nestjs/common';
import { RolPrivilegioService } from './rol-privilegio.service';
import { RolPrivilegioController } from './rol-privilegio.controller';

@Module({
  controllers: [RolPrivilegioController],
  providers: [RolPrivilegioService],
})
export class RolPrivilegioModule {}
