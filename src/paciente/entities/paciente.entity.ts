// src/paciente/entities/paciente.entity.ts
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Persona } from '../../persona/entities/persona.entity';
import { HistorialClinico } from 'historial-clinico/entities/historial-clinico.entity';
import { Cita } from 'cita/entities/cita.entity';

@Entity('paciente')
export class Paciente {
  @PrimaryColumn({ name: 'idPaciente', type: 'int' })
  idPaciente: number;                  //  PK = FK

  @Column() alergias: string;
  @Column({ type: 'bit', default: () => '1' }) habilitado: boolean;

  @OneToOne(() => Persona, p => p.paciente, { eager: true })
  @JoinColumn({ name: 'idPaciente' })
  persona: Persona;

  @OneToMany(() => HistorialClinico, hc => hc.paciente, { cascade: true })
  historiales: HistorialClinico[];

    @OneToMany(() => Cita, c => c.paciente)
  citas: Cita[];

}
