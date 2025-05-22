import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Rol } from '../../rol/entities/rol.entity';
import { Persona } from '../../persona/entities/persona.entity';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  habilitado: boolean;


  @ManyToOne(() => Rol, rol => rol.usuarios)
  @JoinColumn({ name: 'idRol' })
  rol: Rol;

  @OneToOne(() => Persona, persona => persona.usuario)
  persona: Persona;


}
