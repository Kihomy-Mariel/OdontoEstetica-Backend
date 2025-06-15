// src/persona/entities/persona.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Empleado } from 'empleado/entities/empleado.entity';
import { Paciente } from 'paciente/entities/paciente.entity';

@Entity('persona')
export class Persona {
  @PrimaryGeneratedColumn()
  idPersona: number;

  @Column() nombres: string;
  @Column() apellidoPaterno: string;
  @Column() apellidoMaterno: string;
  @Column() ci: string;
  @Column({ type: 'date' }) fechaNacimiento: Date;
  @Column() telefono: string;
  @Column() email: string;
  @Column({ type: 'datetime' }) fechaRegistro: Date;
  @Column({ default: true })
  habilitado: boolean;


  @OneToOne(() => Usuario, usuario => usuario.persona)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;

  @OneToOne(() => Empleado, emp => emp.persona)
  empleado: Empleado;

  @OneToOne(() => Paciente, pac => pac.persona)
  paciente: Paciente;

  

}
