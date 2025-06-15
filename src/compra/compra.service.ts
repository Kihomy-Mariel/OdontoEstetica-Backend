import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from './entities/compra.entity';
import { CreateCompraDto } from './dto/create-compra.dto';

@Injectable()
export class CompraService {
  constructor(
    @InjectRepository(Compra)
    private readonly compraRepository: Repository<Compra>,
  ) {}

  async create(createCompraDto: CreateCompraDto): Promise<Compra> {
    const nuevaCompra = this.compraRepository.create(createCompraDto);
    return this.compraRepository.save(nuevaCompra);
  }

  async findAll(): Promise<Compra[]> {
    return this.compraRepository.find();
  }

  async findOne(id: number): Promise<Compra> {
    return this.compraRepository.findOneBy({ idCompra: id });
  }
}
