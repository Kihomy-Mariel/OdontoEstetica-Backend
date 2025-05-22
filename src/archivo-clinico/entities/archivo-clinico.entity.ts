// src/archivo-clinico/entities/archivo-clinico.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn } from 'typeorm';
import { HistorialClinico } from '../../historial-clinico/entities/historial-clinico.entity';

@Entity('archivo_clinico')
export class ArchivoClinico {
  @PrimaryGeneratedColumn({ name: 'idArchivo' })
  idArchivo: number;

  @Column()
  idHistorialClinico: number;

  @ManyToOne(() => HistorialClinico, (h) => h.archivos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idHistorialClinico' })
  historial: HistorialClinico;

  @Column({ length: 100 })
  tipoArchivo: string;

  @Column({ length: 255 })
  URL: string;

  @Column({ type: 'date' })
  fechaSubida: string;

  @Column('text')
  observaciones: string;
}
