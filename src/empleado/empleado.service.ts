import { Injectable, NotFoundException } from '@nestjs/common';
import { Empleado } from './entities/empleado.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// src/empleado/empleado.service.ts
@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado) private readonly repo: Repository<Empleado>,
  ) {}

  /* Todos los empleados + persona + usuario  */
  findAll() {
    return this.repo.find({
      relations: {
        persona: { usuario: true },   // JOIN   persona → usuario
      },
      where: { habilitado: true },
      order: { idEmpleado: 'ASC' },
    });
  }

  /* Uno por id */
  async findOne(id: number) {
    const empleado = await this.repo.findOne({
      where: { idEmpleado: id },
      relations: { persona: { usuario: true } },
    });
    if (!empleado) throw new NotFoundException('Empleado no existe');
    return empleado;
  }
}

