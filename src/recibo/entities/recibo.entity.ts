import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pago } from 'pago/entities/pago.entity';

@Entity('recibo')
export class Recibo {
  @PrimaryGeneratedColumn({ name: 'idRecibo' })
  idRecibo: number;

  @ManyToOne(() => Pago, pago => pago.recibos)
  @JoinColumn({ name: 'idPago' })
  pago: Pago;

  @Column({ type: 'date' })
  fechaEmision: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  saldoPendiente: number;

  @Column({ type: 'text' })
  observaciones: string;

  @Column({ type: 'varchar', length: 20 })
  estado: string;
}