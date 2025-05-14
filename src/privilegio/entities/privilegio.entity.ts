
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolPrivilegio } from 'rol-privilegio/entities/rol-privilegio.entity';

@Entity()
export class Privilegio {
  @PrimaryGeneratedColumn()
  idPrivilegio: number;

  @Column()
  nombre: string;

  @OneToMany(() => RolPrivilegio, rp => rp.privilegio)
  rolPrivilegios: RolPrivilegio[];

}
