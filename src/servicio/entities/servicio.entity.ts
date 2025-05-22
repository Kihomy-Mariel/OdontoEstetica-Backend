import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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


}
