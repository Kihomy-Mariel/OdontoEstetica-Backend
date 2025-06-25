import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { Proveedor } from '../../proveedor/entities/proveedor.entity';

@Entity('compra')
export class Compra {
  @PrimaryGeneratedColumn()
  idCompra: number;

  @Column()
  idEmpleado: number;

  @Column()
  idProveedor: number;


  // ————— Aquí agregas tu columna de nombre del producto —————
  @Column({ type: 'varchar', length: 255, nullable: false })
  nombreProducto: string;

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
}
