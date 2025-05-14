import { Injectable } from '@nestjs/common';
import { CreateRolPrivilegioDto } from './dto/create-rol-privilegio.dto';
import { UpdateRolPrivilegioDto } from './dto/update-rol-privilegio.dto';

@Injectable()
export class RolPrivilegioService {
  create(createRolPrivilegioDto: CreateRolPrivilegioDto) {
    return 'This action adds a new rolPrivilegio';
  }

  findAll() {
    return `This action returns all rolPrivilegio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rolPrivilegio`;
  }

  update(id: number, updateRolPrivilegioDto: UpdateRolPrivilegioDto) {
    return `This action updates a #${id} rolPrivilegio`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolPrivilegio`;
  }
}
