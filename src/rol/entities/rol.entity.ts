import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from 'usuario/entities/usuario.entity';
import { RolPrivilegio } from 'rol-privilegio/entities/rol-privilegio.entity';


@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  idRol: number;

  @Column()
  nombre: string;
  
@OneToMany(() => Usuario, usuario => usuario.rol)
  usuarios: Usuario[];

@OneToMany(() => RolPrivilegio, rp => rp.rol)
rolPrivilegios: RolPrivilegio[];

}
