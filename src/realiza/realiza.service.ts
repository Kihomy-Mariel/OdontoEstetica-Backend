import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Realiza } from './entities/realiza.entity';
import { CreateRealizaDto } from './dto/create-realiza.dto';
import { UpdateRealizaDto } from './dto/update-realiza.dto';

@Injectable()
export class RealizaService {
  constructor(
    @InjectRepository(Realiza)
    private readonly repo: Repository<Realiza>,
  ) { }

  create(dto: CreateRealizaDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(idEmpleado: number, idServicio: number) {
    const record = await this.repo.findOne({ where: { idEmpleado, idServicio } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(idEmpleado: number, idServicio: number, dto: UpdateRealizaDto) {
    const entity = await this.findOne(idEmpleado, idServicio);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(idEmpleado: number, idServicio: number) {
    await this.findOne(idEmpleado, idServicio);
    return this.repo.delete({ idEmpleado, idServicio });
  }

  async findByEmpleado(idEmpleado: number): Promise<Realiza[]> {
    return this.repo.find({
      where: { idEmpleado, habilitado: true  },
      relations: ['servicio'], // para traer los datos del servicio
    });
  }

  async findByServicio(idServicio: number): Promise<Realiza[]> {
    return this.repo.find({
      where: { idServicio },
      relations: ['empleado'], // para traer los datos del odontólogo
    });
  }

  async getServiciosConOdontologos(): Promise<any[]> {
    const data = await this.repo.find({
      relations: ['servicio', 'empleado', 'empleado.persona'], // traer los datos del servicio y del odontólogo
      where: { habilitado: true }, // solo relaciones habilitadas
    });
    // Filtro adicional por empleados y servicios habilitados, si tienen ese campo
    const filtrados = data.filter((item) =>
      item.empleado?.habilitado !== false &&
      item.servicio?.habilitado !== false &&
      item.empleado?.cargo === 'Odontólogo' // solo odontólogos
    );
    const agrupado = new Map<number, any>();

    for (const item of filtrados) {
      const idServicio = item.idServicio;

      if (!agrupado.has(idServicio)) {
        agrupado.set(idServicio, {
          servicio: item.servicio,
          odontologos: [],
        });
      }

      agrupado.get(idServicio).odontologos.push({
        idEmpleado: item.idEmpleado,
        nombres: item.empleado?.persona?.nombres,
        apellidoMaterno: item.empleado?.persona?.apellidoMaterno,
        apellidoPaterno: item.empleado?.persona?.apellidoPaterno, // o item.empleado?.persona?.nombre si lo tienes separado
      });
    }

    return Array.from(agrupado.values());
  }

}
