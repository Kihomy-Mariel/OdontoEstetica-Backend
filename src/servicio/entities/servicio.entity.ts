import { CitaServicio } from 'cita-servicio/entities/cita-servicio.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Realiza } from 'realiza/entities/realiza.entity';

@Entity('servicio')
export class Servicio {
    @PrimaryGeneratedColumn()
    idServicio: number;

    @Column({ length: 100 })
    nombreServicio: string;

    @Column('text')
    descripcion: string;

    @Column('decimal', { precision: 10, scale: 2 })
    precio: number;

    @Column({ length: 50 })
    duracionEstimada: string;

    @Column({ default: true })
    habilitado: boolean;

    @OneToMany(() => CitaServicio, (cs) => cs.servicio)
    citaServicios: CitaServicio[];

    @OneToMany(() => Realiza, (realiza) => realiza.servicio)
    realizadoPor: Realiza[];

}
