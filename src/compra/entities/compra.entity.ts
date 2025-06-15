import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { Proveedor } from '../../proveedor/entities/proveedor.entity';

@Entity('compra')
export class Compra {
  @PrimaryGeneratedColumn({ name: 'idCompra' })
  idCompra: number;

  @Column({ name: 'fechaCompra', type: 'date' })
  fechaCompra: string;

  @Column({ name: 'estado', type: 'varchar', length: 20 })
  estado: string;

  @Column({ name: 'precioTotalCompra', type: 'decimal', precision: 10, scale: 2 })
  precioTotalCompra: number;

  @ManyToOne(() => Empleado, (empleado) => empleado.compras)
  @JoinColumn({ name: 'idEmpleado' })
  empleado: Empleado;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.compras)
  @JoinColumn({ name: 'idProveedor' })
  proveedor: Proveedor;
}
