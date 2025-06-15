import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('proveedor')
export class Proveedor {
  @PrimaryColumn()
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
}
