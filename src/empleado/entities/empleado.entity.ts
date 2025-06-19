// src/empleado/entities/empleado.entity.ts
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Persona } from '../../persona/entities/persona.entity';
import { Asistencia } from 'asistencia/entities/asistencia.entity';
import { Realiza } from 'realiza/entities/realiza.entity';
import { Compra } from '../../compra/entities/compra.entity';


@Entity('empleado')
export class Empleado {

  // PK = FK a PERSONA
  @PrimaryColumn({ name: 'idEmpleado', type: 'int' })
  idEmpleado: number;

  @Column() cargo: string;
  @Column() especialidad: string;
    @Column({ type: 'bit', default: () => '1' }) habilitado: boolean;

  /* relación persona */
  @OneToOne(() => Persona, p => p.empleado, { eager: true })
  @JoinColumn({ name: 'idEmpleado' })          //  PK = FK
  persona: Persona;


  /* relación con asistencias */
  @OneToMany(() => Asistencia, a => a.empleado)   //  ←  CONSÉRVALO
  asistencias: Asistencia[];

  @OneToMany(() => Realiza, (realiza) => realiza.empleado)
realizaServicios: Realiza[];

    @OneToMany(() => Compra, compra => compra.empleado)
  compras: Compra[];
}

