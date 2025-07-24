import { Injectable } from '@nestjs/common';
import { CreateDetalleCompraDto } from './dto/create-detalle-compra.dto';
import { UpdateDetalleCompraDto } from './dto/update-detalle-compra.dto';

@Injectable()
export class DetalleCompraService {
  create(createDetalleCompraDto: CreateDetalleCompraDto) {
    return 'This action adds a new detalleCompra';
  }

  findAll() {
    return `This action returns all detalleCompra`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleCompra`;
  }

  update(id: number, updateDetalleCompraDto: UpdateDetalleCompraDto) {
    return `This action updates a #${id} detalleCompra`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleCompra`;
  }
}
