import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Rol } from 'rol/entities/rol.entity';
import { Privilegio } from 'privilegio/entities/privilegio.entity';


@Entity('rol_privilegio')
export class RolPrivilegio {
  @PrimaryGeneratedColumn()
  idRolPrivilegio: number;

  @ManyToOne(() => Rol, rol => rol.rolPrivilegios)
  @JoinColumn({ name: 'idRol' })
  rol: Rol;

  @ManyToOne(() => Privilegio, privilegio => privilegio.rolPrivilegios)
  @JoinColumn({ name: 'idPrivilegio' })
  privilegio: Privilegio;

  @Column({ default: true })
  habilitado: boolean;
}
// 