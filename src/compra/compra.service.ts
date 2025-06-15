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

  async create(dto: CreateCompraDto): Promise<Compra> {
    const nuevaCompra = this.compraRepository.create(dto);
    return await this.compraRepository.save(nuevaCompra);
  }

  async findAll(): Promise<Compra[]> {
    return await this.compraRepository.find({ relations: ['empleado', 'proveedor'] });
  }

  async findOne(id: number): Promise<Compra | null>  {
    return await this.compraRepository.findOne({
  relations: {
    empleado: true,
    proveedor: true,
  },
  where: {
    idCompra: id,
  },
});

  }
}
