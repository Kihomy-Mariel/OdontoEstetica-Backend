import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Persona } from "./entities/persona.entity";

// src/persona/persona.service.ts
@Injectable()
export class PersonaService {
  constructor(@InjectRepository(Persona) private repo: Repository<Persona>) {}

  findAll() {
    return this.repo.find({
      relations: { usuario: true, empleado: true, paciente: true },
      order: { idPersona: 'ASC' },
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { idPersona: id },
      relations: { usuario: true, empleado: true, paciente: true },
    });
  }
}
