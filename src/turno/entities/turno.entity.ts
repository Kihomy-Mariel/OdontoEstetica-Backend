// src/turno/entities/turno.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Asistencia } from 'asistencia/entities/asistencia.entity';

@Entity('turno')
export class Turno {

  @PrimaryGeneratedColumn({ name: 'idTurno', type: 'int' })
  idTurno: number;

  @Column() nombreTurno: string;
  @Column({ type: 'time' }) horaInicio: string;
  @Column({ type: 'time' }) horaFin: string;
  @Column({ default: true }) habilitado: boolean;

  @OneToMany(() => Asistencia, a => a.turno)
  asistencias: Asistencia[];
}

