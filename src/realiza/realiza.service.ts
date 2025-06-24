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
  ) {}

  /* ───────────────  CREATE  ─────────────── */
  async create(dto: CreateRealizaDto) {
    // Forzamos habilitado = true por seguridad
    const entity = this.repo.create({ ...dto, habilitado: true });
    return this.repo.save(entity);
  }

  /* ───────────────  READ  ─────────────── */

  // Todos los realiza activos
  findAll() {
    return this.repo.find({
      where: { habilitado: true },
      relations: ['empleado', 'servicio'],
    });
  }

  // Uno en concreto (solo si está habilitado)
  async findOne(idEmpleado: number, idServicio: number) {
    const record = await this.repo.findOne({
      where: { idEmpleado, idServicio, habilitado: true },
    });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  /* ───────────────  UPDATE  ─────────────── */
  async update(
    idEmpleado: number,
    idServicio: number,
    dto: UpdateRealizaDto,
  ) {
    // Trae solo el activo
    const entity = await this.findOne(idEmpleado, idServicio);

    // Únicamente actualizamos observaciones
    entity.observaciones = dto.observaciones?.trim() ?? entity.observaciones;

    return this.repo.save(entity);
  }

  /* ───────────────  DELETE LÓGICO  ─────────────── */
  async remove(idEmpleado: number, idServicio: number) {
    const entity = await this.findOne(idEmpleado, idServicio);
    entity.habilitado = false;
    return this.repo.save(entity);           // devolvemos la entidad “deshabilitada”
  }

  /* ───────────────  QUERY POR EMPLEADO  ─────────────── */
  findByEmpleado(idEmpleado: number) {
    return this.repo.find({
      where: { idEmpleado, habilitado: true },
      relations: ['servicio'],
    });
  }

  /* ───────────────  QUERY POR SERVICIO  ─────────────── */
  findByServicio(idServicio: number) {
    return this.repo.find({
      where: { idServicio, habilitado: true },
      relations: ['empleado'],
    });
  }

/* ───────────────  LISTA AGRUPADA  ─────────────── */
async getServiciosConOdontologos() {
  const data = await this.repo.find({
    where: { habilitado: true },
    relations: ['servicio', 'empleado', 'empleado.persona'],
  });

  // Filtra empleados y servicios activos, solo cargo “Odontólogo”
  const filtrados = data.filter(
    (r) =>
      r.empleado?.habilitado &&
      r.servicio?.habilitado &&
      r.empleado?.cargo === 'Odontólogo',
  );

  const mapa = new Map<number, { servicio: any; odontologos: any[] }>();

  filtrados.forEach((r) => {
    let grupo = mapa.get(r.idServicio);

    if (!grupo) {
      grupo = { servicio: r.servicio, odontologos: [] };
      mapa.set(r.idServicio, grupo);
    }

    grupo.odontologos.push({
      idEmpleado: r.idEmpleado,
      nombres: r.empleado.persona?.nombres,
      apellidoPaterno: r.empleado.persona?.apellidoPaterno,
      apellidoMaterno: r.empleado.persona?.apellidoMaterno,
    });
  });

  return Array.from(mapa.values());
}

}
