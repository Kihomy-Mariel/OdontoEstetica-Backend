// src/odontograma/entities/odontograma-detalle.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Odontograma } from 'odontograma/entities/odontograma.entity';

@Entity('odontograma_detalle')
export class OdontogramaDetalle {
  @PrimaryGeneratedColumn({ name: 'idDetalle' })
  idDetalle: number;

  @Column()
  idOdontograma: number;

  @ManyToOne(() => Odontograma, (o) => o.detalles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idOdontograma' })
  odontograma: Odontograma;

  @Column({ length: 5 })
  numeroPiezaDental: string;

  @Column({ length: 50 })
  estado: 'sano'|'caries'|'obturado'|'extraido'|'corona'|'endodoncia';


  @Column('text')
  observaciones: string;
}
