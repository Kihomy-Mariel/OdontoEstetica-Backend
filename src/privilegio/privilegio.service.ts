import { Injectable } from '@nestjs/common';
import { CreatePrivilegioDto } from './dto/create-privilegio.dto';
import { UpdatePrivilegioDto } from './dto/update-privilegio.dto';

@Injectable()
export class PrivilegioService {
  create(createPrivilegioDto: CreatePrivilegioDto) {
    return 'This action adds a new privilegio';
  }

  findAll() {
    return `This action returns all privilegio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} privilegio`;
  }

  update(id: number, updatePrivilegioDto: UpdatePrivilegioDto) {
    return `This action updates a #${id} privilegio`;
  }

  remove(id: number) {
    return `This action removes a #${id} privilegio`;
  }
}
