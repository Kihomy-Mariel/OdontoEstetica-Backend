import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Empleado } from 'empleado/entities/empleado.entity';
import { Servicio } from 'servicio/entities/servicio.entity';

@Entity('realiza')
export class Realiza {
  @PrimaryColumn()
  idEmpleado: number;

  @PrimaryColumn()
  idServicio: number;

  @ManyToOne(() => Empleado, (empleado) => empleado.realizaServicios, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idEmpleado' })
  empleado: Empleado;

  @ManyToOne(() => Servicio, (servicio) => servicio.realizadoPor, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idServicio' })
  servicio: Servicio;

  @Column({ type: 'text' })
  observaciones: string;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  habilitado: boolean;
}
