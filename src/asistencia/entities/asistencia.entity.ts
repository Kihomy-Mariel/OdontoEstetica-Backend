// src/asistencia/entities/asistencia.entity.ts
import {
  Entity, ManyToOne, JoinColumn, PrimaryColumn, Column,
} from 'typeorm';
import { Empleado } from 'empleado/entities/empleado.entity';
import { Turno } from 'turno/entities/turno.entity';


@Entity('asistencia')
export class Asistencia {
  /* ─────────────  Clave compuesta  ───────────── */
  @PrimaryColumn({ name: 'idEmpleado', type: 'int' })
  idEmpleado: number;

  @PrimaryColumn({ name: 'idTurno', type: 'int' })
  idTurno: number;

  @PrimaryColumn({ name: 'diaSemana', type: 'varchar', length: 15 })
  diaSemana: string;                       // ej. 'lunes'

  /* ─────────────  Relaciones  ───────────── */
     // → Relación con Empleado (y de allí a Persona)
  @ManyToOne(() => Empleado, empleado => empleado.asistencias, { eager: true })
  @JoinColumn({ name: 'idEmpleado' })
  empleado: Empleado;

  // → Relación con Turno
  @ManyToOne(() => Turno, turno => turno.asistencias, { eager: true })
  @JoinColumn({ name: 'idTurno' })
  turno: Turno;



  /* ─────────────  Otros campos  ───────────── */
  @Column({ type: 'time' })
  horaLlegada: string;          // formato HH:MM

  @Column({ type: 'time' })
  horaSalida: string;

  @Column({ default: true })
  habilitado: boolean;
}


