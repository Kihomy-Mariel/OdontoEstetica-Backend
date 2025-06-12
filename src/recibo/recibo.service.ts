import { Injectable } from '@nestjs/common';
import { CreateReciboDto } from './dto/create-recibo.dto';
import { UpdateReciboDto } from './dto/update-recibo.dto';

@Injectable()
export class ReciboService {
  create(createReciboDto: CreateReciboDto) {
    return 'This action adds a new recibo';
  }

  findAll() {
    return `This action returns all recibo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recibo`;
  }

  update(id: number, updateReciboDto: UpdateReciboDto) {
    return `This action updates a #${id} recibo`;
  }

  remove(id: number) {
    return `This action removes a #${id} recibo`;
  }
}
