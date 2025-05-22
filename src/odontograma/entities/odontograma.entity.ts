// src/odontograma/entities/odontograma.entity.ts
import { from } from 'rxjs';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { HistorialClinico } from '../../historial-clinico/entities/historial-clinico.entity';
import { OdontogramaDetalle } from 'odontograma-detalle/entities/odontograma-detalle.entity';

@Entity('odontograma')
export class Odontograma {
  @PrimaryGeneratedColumn({ name: 'idOdontograma' })
  idOdontograma: number;

  @Column()
  idHistorialClinico: number;

  @ManyToOne(() => HistorialClinico, (h) => h.odontogramas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idHistorialClinico' })
  historial: HistorialClinico;

  @Column({ length: 50 })
  tipo: string;

  @Column('text')
  descripcion: string;

  @Column({ length: 255 })
  archivoURL: string;

  @OneToMany(() => OdontogramaDetalle, det => det.odontograma, { eager: true })
  detalles: OdontogramaDetalle[];
}
