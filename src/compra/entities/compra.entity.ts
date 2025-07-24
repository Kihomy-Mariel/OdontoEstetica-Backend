import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { Proveedor } from '../../proveedor/entities/proveedor.entity';
import { DetalleCompra } from '../../detalle-compra/entities/detalle-compra.entity';

@Entity('compra')
export class Compra {
  @PrimaryGeneratedColumn()
  idCompra: number;

  @Column()
  idEmpleado: number;

  @Column()
  idProveedor: number;

  @Column({ type: 'date' })
  fechaCompra: Date;

  @Column({ length: 20 })
  estado: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioTotalCompra: number;

  @ManyToOne(() => Empleado, empleado => empleado.compras)
  @JoinColumn({ name: 'idEmpleado' })
  empleado: Empleado;

  @ManyToOne(() => Proveedor, proveedor => proveedor.compras)
  @JoinColumn({ name: 'idProveedor' })
  proveedor: Proveedor;

  @OneToMany(() => DetalleCompra, (detalle) => detalle.compra, { cascade: true })
  detalles: DetalleCompra[];
  
}
