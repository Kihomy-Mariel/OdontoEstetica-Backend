import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Cita } from '../../cita/entities/cita.entity';
import { Servicio } from '../../servicio/entities/servicio.entity';

@Entity('cita_servicio')
export class CitaServicio {
  @PrimaryColumn()
  idCita: number;

  @PrimaryColumn()
  idServicio: number;

  @ManyToOne(() => Cita, (cita) => cita.citaServicios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idCita' })
  cita: Cita;

  @ManyToOne(() => Servicio, (servicio) => servicio.citaServicios, { eager: true })
  @JoinColumn({ name: 'idServicio' })
  servicio: Servicio;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioAplicado: number;

  @Column()
  cantidadServicio: number;

  @Column({ type: 'text' })
  observaciones: string;
}
