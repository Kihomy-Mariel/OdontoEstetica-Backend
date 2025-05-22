// src/agenda/entities/agenda.entity.ts
import { Cita } from 'cita/entities/cita.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agenda')
export class Agenda {
  @PrimaryGeneratedColumn()
  idAgenda: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'time' })
  horaInicio: string;

  @Column({ type: 'time' })
  horaFin: string;

  @Column({ length: 20 })
  estado: string;

  @Column('text')
  observaciones: string;

  @Column({ default: true })
  habilitado: boolean;

  @OneToMany(() => Cita, c => c.agenda)
  citas: Cita[];

}
