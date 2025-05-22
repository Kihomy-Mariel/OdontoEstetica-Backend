// src/asistencia/asistencia.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository }              from '@nestjs/typeorm';
import { Repository }                    from 'typeorm';

import { Asistencia }                    from './entities/asistencia.entity';
import { Turno }                         from 'turno/entities/turno.entity';
import { Empleado }                      from 'empleado/entities/empleado.entity';

import { AssignTurnoDto }                from './dto/assign-turno.dto';
import { UpdateAsistenciaDto }           from './dto/update-asistencia.dto';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia) private readonly asisRepo: Repository<Asistencia>,
    @InjectRepository(Turno)      private readonly turnoRepo: Repository<Turno>,
    @InjectRepository(Empleado)   private readonly empRepo:   Repository<Empleado>,
  ) {}

  /* ──────────────────────────── 1. CREAR / UPSERT ──────────────────────────── */
  async assignTurno(dto: AssignTurnoDto) {
    // ¿Empleado y turno existen y están habilitados?
    const empleado = await this.empRepo.findOneBy({ idEmpleado: dto.idEmpleado });
    const turno    = await this.turnoRepo.findOneBy({ idTurno: dto.idTurno, habilitado: true });

    if (!empleado || !turno) {
      throw new NotFoundException('Empleado o turno no encontrado');
    }

    // upsert
    const entidad = this.asisRepo.create(dto);
    return this.asisRepo.save(entidad);
  }

  /* ───────────────────────── 2. OBTENER AGENDA DE EMPLEADO ─────────────────── */
  async findByEmpleado(idEmpleado: number) {
    return this.asisRepo.find({
      where: { idEmpleado },
      relations: ['turno'],            // quita si no necesitas traer el turno
    });
  }

  /* ───────────────────────────── 3. ACTUALIZAR ─────────────────────────────── */
  async updateAsignacion(
    idEmpleado: number,
    idTurno:    number,
    diaSemana:  string,
    dto:        UpdateAsistenciaDto,
  ) {
    const { newIdEmpleado, newIdTurno, newDiaSemana, horaLlegada, horaSalida } = dto;

    // ¿Se mueve la PK?
    const moverPK =
      newIdEmpleado !== undefined ||
      newIdTurno    !== undefined ||
      newDiaSemana  !== undefined;

    if (moverPK) {
      /* 1️⃣ borrar registro antiguo */
      await this.asisRepo.delete({ idEmpleado, idTurno, diaSemana });

      /* 2️⃣ crear registro nuevo */
      const nueva = this.asisRepo.create({
        idEmpleado : newIdEmpleado ?? idEmpleado,
        idTurno    : newIdTurno    ?? idTurno,
        diaSemana  : newDiaSemana  ?? diaSemana,
        horaLlegada: horaLlegada   ?? undefined,
        horaSalida : horaSalida    ?? undefined,
      });
      return this.asisRepo.save(nueva);
    }

    /* Sólo cambian horas ⇒ UPDATE “in-place” */
    await this.asisRepo.update(
      { idEmpleado, idTurno, diaSemana },
      { horaLlegada, horaSalida },
    );
    return this.asisRepo.findOneBy({ idEmpleado, idTurno, diaSemana });
  }

  /* ───────────────────────────── 4. ELIMINAR ──────────────────────────────── */
  async remove(idEmpleado: number, idTurno: number, diaSemana: string) {
    await this.asisRepo.delete({ idEmpleado, idTurno, diaSemana });
    return { ok: true };
  }

  findAll() {
    return this.asisRepo.find({
      where: { habilitado: true },
      relations: ['empleado', 'empleado.persona', 'turno'],
    });
  }

}
