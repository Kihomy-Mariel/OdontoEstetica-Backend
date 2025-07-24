import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from './entities/compra.entity';
import { CreateCompraDto } from './dto/create-compra.dto';

@Injectable()
export class CompraService {
  constructor(
    @InjectRepository(Compra)
    private readonly compraRepository: Repository<Compra>,
  ) { }

async create(createCompraDto: CreateCompraDto): Promise<Compra> {
  const { detalles, ...resto } = createCompraDto;

  const precioTotalCalculado = detalles.reduce((total, item) => {
    return total + item.cantidad * item.precioUnitario;
  }, 0);

  const compra = this.compraRepository.create({
    ...resto,
    precioTotalCompra: precioTotalCalculado,
    detalles,
  });

  return this.compraRepository.save(compra);
}



  async findAll(): Promise<Compra[]> {
    return this.compraRepository.find({
      relations: ['empleado', 'proveedor', 'detalles', 'detalles.producto'],
    });
  }


  async findOne(id: number): Promise<Compra> {
    const compra = await this.compraRepository.findOne({
      where: { idCompra: id },
      relations: [
        'empleado',
        'proveedor',
        'detalles',
        'detalles.producto',
      ],
    });

    if (!compra) {
      throw new NotFoundException(`Compra ${id} no encontrada`);
    }

    return compra;
  }

}
