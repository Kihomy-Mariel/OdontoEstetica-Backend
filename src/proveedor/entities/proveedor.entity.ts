import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Compra } from 'compra/entities/compra.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity('proveedor')
export class Proveedor {
  @PrimaryGeneratedColumn()
  idProveedor: number;

  @Column({ length: 100 })
  nombreCompleto: string;

  @Column({ length: 255 })
  direccion: string;

  @Column()
  telefono: number;

  @Column({ length: 100 })
  email: string;

  @Column({ type: 'tinyint', default: 1 })
  habilitado: number;

  @OneToMany(() => Compra, compra => compra.proveedor)
  compras: Compra[];
}
