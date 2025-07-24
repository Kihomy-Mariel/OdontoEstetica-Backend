import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { DetalleCompra } from 'detalle-compra/entities/detalle-compra.entity';

@Entity({ name: 'producto' })
export class Producto {
  @PrimaryGeneratedColumn({ name: 'idProducto' })
  idProducto: number;

  @Column({ name: 'nombreProducto', type: 'varchar', length: 100 })
  nombreProducto: string;

  @Column({ name: 'descripcion', type: 'text' })
  descripcion: string;

  @Column({ name: 'stockActual', type: 'int' })
  stockActual: number;

  @Column({ name: 'stockMinimo', type: 'int' })
  stockMinimo: number;

  @Column({ name: 'unidadMedida', type: 'varchar', length: 20 })
  unidadMedida: string;

  @Column({ name: 'habilitado', type: 'tinyint', width: 1, default: () => '1' })
  habilitado: boolean;

  @OneToMany(() => DetalleCompra, (detalle) => detalle.producto)
  detallesCompra: DetalleCompra[];


}
