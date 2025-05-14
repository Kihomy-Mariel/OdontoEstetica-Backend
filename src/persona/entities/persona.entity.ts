import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('persona')
export class Persona {
  @PrimaryGeneratedColumn()
  idPersona: number;

  @Column()
  nombres: string;

  @Column()
  apellidoPaterno: string;

  @Column()
  apellidoMaterno: string;

  @Column()
  ci: string;

  @Column()
  fechaNacimiento: Date;

  @Column()
  telefono: number;

  @Column()
  email: string;

  @Column()
  fechaRegistro: Date;

  @Column({ type: 'bit' })
  habilitado: boolean;
}
