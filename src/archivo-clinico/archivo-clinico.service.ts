// src/archivo-clinico/archivo-clinico.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArchivoClinico } from './entities/archivo-clinico.entity';
import { CreateArchivoClinicoDto } from './dto/create-archivo-clinico.dto';
import { UpdateArchivoClinicoDto } from './dto/update-archivo-clinico.dto';

@Injectable()
export class ArchivoClinicoService {
  constructor(
    @InjectRepository(ArchivoClinico)
    private readonly repo: Repository<ArchivoClinico>,
  ) {}

  create(dto: CreateArchivoClinicoDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find({ relations: ['historial'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { idArchivo: id },
      relations: ['historial'],
    });
  }

  update(id: number, dto: UpdateArchivoClinicoDto) {
    return this.repo.update(id, dto);
  }

 /* remove(id: number) {
    return this.repo.delete(id);
  }*/

  // opcional: todos los archivos de un historial específico
  findByHistorial(idHistorial: number) {
    return this.repo.find({
      where: { idHistorialClinico: idHistorial },
      relations: ['historial'],
    });
  }
}
