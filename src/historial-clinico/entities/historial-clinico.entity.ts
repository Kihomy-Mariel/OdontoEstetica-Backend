// src/historial-clinico/entities/historial-clinico.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { ArchivoClinico } from 'archivo-clinico/entities/archivo-clinico.entity';
import { Odontograma } from 'odontograma/entities/odontograma.entity';

@Entity('historial_clinico')
export class HistorialClinico {
  @PrimaryGeneratedColumn()
  idHistorialClinico: number;

  @Column()
  idPaciente: number;

 @ManyToOne(() => Paciente, p => p.historiales, { eager: true })
@JoinColumn({ name: 'idPaciente' })
paciente: Paciente;


  @Column({ type: 'datetime' })
  fechaRegistroHistorial: Date;

  @Column('text')
  antecedentesMedicos: string;

  @Column('text')
  antecedentesOdontologicos: string;

  @Column('text')
  diagnostico: string;

  @Column('text')
  tratamientoPropuesto: string;

  @Column('text')
  tratamientoRealizado: string;

  @Column('text')
  observaciones: string;

  @Column('int')
  edadEnConsulta: number;

    @OneToMany(() => ArchivoClinico, (a) => a.historial)
  archivos: ArchivoClinico[];

  @OneToMany(() => Odontograma, (o) => o.historial)
  odontogramas: Odontograma[];
}

