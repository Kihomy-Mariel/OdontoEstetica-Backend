import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolPrivilegioService } from './rol-privilegio.service';
import { CreateRolPrivilegioDto } from './dto/create-rol-privilegio.dto';
import { UpdateRolPrivilegioDto } from './dto/update-rol-privilegio.dto';

@Controller('rol-privilegio')
export class RolPrivilegioController {
  constructor(private readonly rolPrivilegioService: RolPrivilegioService) {}

  @Post()
  create(@Body() createRolPrivilegioDto: CreateRolPrivilegioDto) {
    return this.rolPrivilegioService.create(createRolPrivilegioDto);
  }

  @Get()
  findAll() {
    return this.rolPrivilegioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolPrivilegioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolPrivilegioDto: UpdateRolPrivilegioDto) {
    return this.rolPrivilegioService.update(+id, updateRolPrivilegioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolPrivilegioService.remove(+id);
  }
}
