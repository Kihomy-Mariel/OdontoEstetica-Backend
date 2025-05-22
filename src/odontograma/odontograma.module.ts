// src/odontograma/odontograma.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OdontogramaService } from './odontograma.service';
import { OdontogramaController } from './odontograma.controller';
import { Odontograma } from './entities/odontograma.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Odontograma]),   // <— aquí registras el repositorio
  ],
  providers: [OdontogramaService],
  controllers: [OdontogramaController],
  exports: [OdontogramaService],
})
export class OdontogramaModule {}
