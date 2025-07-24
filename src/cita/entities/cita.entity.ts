// src/cita/entities/cita.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { Agenda } from '../../agenda/entities/agenda.entity';
import { CitaServicio } from 'cita-servicio/entities/cita-servicio.entity';

export type CitaEstado = 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA';

@Entity('cita')
export class Cita {
  @PrimaryGeneratedColumn({ name: 'idCita' })
  idCita: number;


  @ManyToOne(() => Paciente, paciente => paciente.citas)
  @JoinColumn({ name: 'idPaciente' })
  paciente: Paciente;


  @Column()
  idAgenda: number;
  @ManyToOne(() => Agenda, a => a.citas, { eager: true })
  @JoinColumn({ name: 'idAgenda' })
  agenda: Agenda;

  @Column({ type: 'varchar', length: 30, default: 'CONFIRMADO' })
  estado: CitaEstado;

  @Column({ type: 'varchar', length: 255 })
  motivo: string;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'time' })
  hora: string;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  habilitado: boolean;

  @OneToMany(() => CitaServicio, (cs) => cs.cita, { cascade: true })
  citaServicios: CitaServicio[];


}
