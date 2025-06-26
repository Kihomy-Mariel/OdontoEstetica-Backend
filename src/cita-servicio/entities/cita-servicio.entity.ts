import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Cita } from '../../cita/entities/cita.entity';
import { Servicio } from '../../servicio/entities/servicio.entity';

@Entity('cita_servicio')
export class CitaServicio {
  @PrimaryColumn()
  idCita: number;

  @PrimaryColumn()
  idServicio: number;

  @ManyToOne(() => Cita, (cita) => cita.citaServicios, { onDelete: 'CASCADE',eager: true })
  @JoinColumn({ name: 'idCita' })
  cita: Cita;

  @ManyToOne(() => Servicio, (servicio) => servicio.citaServicios, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'idServicio' })
  servicio: Servicio;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioAplicado: number;

  @Column({ type: 'int' })
  cantidadServicio: number;

  @Column({ type: 'text' })
  observaciones: string;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  habilitado: boolean;
}
