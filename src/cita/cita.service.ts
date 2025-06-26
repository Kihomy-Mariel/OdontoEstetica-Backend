import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './entities/cita.entity';
import { CitaServicio } from '../cita-servicio/entities/cita-servicio.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepo: Repository<Cita>,
    
    @InjectRepository(CitaServicio) 
    private readonly citaServicioRepo: Repository<CitaServicio>,
  ) { }

  async create(dto: CreateCitaDto): Promise<Cita> {
    const cita = this.citaRepo.create(dto);
    return await this.citaRepo.save(cita);
  }

  findAll(): Promise<Cita[]> {
    return this.citaRepo.find({
      order: { fecha: 'ASC', hora: 'ASC' },
      relations: [
        'paciente',
        'paciente.persona',
        'agenda',
        'citaServicios',
        'citaServicios.servicio',
      ]
    });
  }

  async findOne(id: number) {
    const cita = await this.citaRepo.findOne({ where: { idCita: id } });
    if (!cita) {
      throw new NotFoundException(`Cita con id ${id} no encontrada`);
    }
    return cita;
  }

  async update(id: number, dto: UpdateCitaDto): Promise<Cita> {
    await this.findOne(id);               // valida existencia
    await this.citaRepo.update(id, dto);  // aplica cambios
    return this.findOne(id);              // devuelve el registro actualizado
  }

  async remove(id: number) {
    const result = await this.citaRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cita con id ${id} no encontrada`);
    }
    return { message: `Cita con id ${id} eliminada` };
  }

  findByPaciente(idPaciente: number) {
    return this.citaRepo.find({
      where: { idPaciente },
      order: { fecha: 'ASC', hora: 'ASC' },
    });
  }

  findByAgenda(idAgenda: number) {
    return this.citaRepo.find({
      where: { idAgenda },
      order: { fecha: 'ASC', hora: 'ASC' },
    });
  }

async findByFecha(fecha: string): Promise<Cita[]> {
  // Validación adicional por si acaso (aunque ya se validó en el controlador)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    throw new BadRequestException('Formato de fecha inválido. Use YYYY-MM-DD');
  }
  
  return this.citaRepo.find({
    where: { fecha },
    order: { hora: 'ASC' },
    relations: ['paciente', 'agenda', 'citaServicios'] // Añade relaciones si las necesitas
  });
}

async softDeleteCita(id: number) {
  // 1. Deshabilita la cita
  await this.citaRepo.update(id, { habilitado: false });
  // 2. Deshabilita todos los cita-servicio asociados
  await this.citaServicioRepo.update({ idCita: id }, { habilitado: false });
  return { message: 'Cita y servicios asociados deshabilitados' };
}

}
