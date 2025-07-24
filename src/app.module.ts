const crypto = require('crypto');
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 👈 IMPORTANTE
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PersonaModule } from './persona/persona.module';
import { RolModule } from './rol/rol.module';
import { PrivilegioModule } from './privilegio/privilegio.module';
import { RolPrivilegioModule } from './rol-privilegio/rol-privilegio.module';
import { PacienteModule } from './paciente/paciente.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { TurnoModule } from './turno/turno.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { ServicioModule } from './servicio/servicio.module';
import { AgendaModule } from './agenda/agenda.module';
import { HistorialClinicoModule } from './historial-clinico/historial-clinico.module';
import { ArchivoClinicoModule } from './archivo-clinico/archivo-clinico.module';
import { OdontogramaModule } from './odontograma/odontograma.module';
import { OdontogramaDetalleModule } from './odontograma-detalle/odontograma-detalle.module';
import { CitaModule } from './cita/cita.module';
import { CitaServicioModule } from './cita-servicio/cita-servicio.module';
import { PagoModule } from './pago/pago.module';
import { ReciboModule } from './recibo/recibo.module';
import { ProductoModule } from './producto/producto.module';
import { RealizaModule } from './realiza/realiza.module';
import { CompraModule } from './compra/compra.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { DetalleCompraModule } from './detalle-compra/detalle-compra.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT') || '3307'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),

    AuthModule,
    UsuarioModule,
    PersonaModule,
    RolModule,
    PrivilegioModule,
    RolPrivilegioModule,
    PacienteModule,
    EmpleadoModule,
    TurnoModule,
    AsistenciaModule,
    ServicioModule,
    AgendaModule,
    HistorialClinicoModule,
    ArchivoClinicoModule,
    OdontogramaModule,
    OdontogramaDetalleModule,
    CitaModule,
    CitaServicioModule,
    PagoModule,
    ReciboModule,
    ProductoModule,
    RealizaModule,
    CompraModule,
    ProveedorModule,
    DetalleCompraModule,
  ],
})
export class AppModule {}
