// pago.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Cita } from 'cita/entities/cita.entity';
import { Recibo } from 'recibo/entities/recibo.entity';

@Entity('pago')
export class Pago {
  @PrimaryGeneratedColumn({ name: 'idPago' })
  idPago: number;

  @Column({ name: 'fechaPago', type: 'date' })
  fechaPago: string;

  @Column({ name: 'montoPagado', type: 'decimal', precision: 10, scale: 2 })
  montoPagado: number;

  @Column({ name: 'formaPago', type: 'varchar', length: 50 })
  formaPago: string;

  @Column({ name: 'estado', type: 'varchar', length: 20 })
  estado: string;

  @Column()
  idCita: number;

  @ManyToOne(() => Cita, cita => cita.idCita, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idCita' })
  cita: Cita;

  @OneToMany(() => Recibo, recibo => recibo.pago)
  recibos: Recibo[];

}
