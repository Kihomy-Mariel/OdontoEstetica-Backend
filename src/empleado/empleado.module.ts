import { Module } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { UsuarioModule } from '../usuario/usuario.module'; // Asegúrate de que la ruta sea correcta
import { forwardRef } from '@nestjs/common'; // Importa forwardRef para evitar problemas de dependencia circular
@Module({
      
  imports: [forwardRef(() => UsuarioModule),TypeOrmModule.forFeature([Empleado])],
  controllers: [EmpleadoController],
  providers: [EmpleadoService],
  exports: [EmpleadoService],
})
export class EmpleadoModule {}
