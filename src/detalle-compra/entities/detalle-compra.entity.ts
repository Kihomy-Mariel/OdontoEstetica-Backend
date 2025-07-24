import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Compra } from '../../compra/entities/compra.entity';
import { Producto } from '../../producto/entities/producto.entity';

@Entity('detalle_compra')
export class DetalleCompra {
  @PrimaryColumn()
  idCompra: number;

  @PrimaryColumn()
  idProducto: number;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @ManyToOne(() => Compra, (compra) => compra.detalles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idCompra' })
  compra: Compra;

  @ManyToOne(() => Producto, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idProducto' })
  producto: Producto;
}
