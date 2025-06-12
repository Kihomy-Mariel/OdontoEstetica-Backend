import { Cita } from 'cita/entities/cita.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('agenda')
export class Agenda {
  @PrimaryGeneratedColumn({ name: 'idAgenda' })
  idAgenda: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'time' })
  horaInicio: string;

  @Column({ type: 'time' })
  horaFin: string;

  @Column({ type: 'varchar', length: 20, default: 'disponible' })
  estado: string;

  @Column({ type: 'text' })
  observaciones: string;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  habilitado: boolean;

  @OneToMany(() => Cita, (cita) => cita.agenda)
citas: Cita[];
}
