import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrivilegioService } from './privilegio.service';
import { CreatePrivilegioDto } from './dto/create-privilegio.dto';
import { UpdatePrivilegioDto } from './dto/update-privilegio.dto';

@Controller('privilegio')
export class PrivilegioController {
  constructor(private readonly privilegioService: PrivilegioService) {}

  @Post()
  create(@Body() createPrivilegioDto: CreatePrivilegioDto) {
    return this.privilegioService.create(createPrivilegioDto);
  }

  @Get()
  findAll() {
    return this.privilegioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.privilegioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrivilegioDto: UpdatePrivilegioDto) {
    return this.privilegioService.update(+id, updatePrivilegioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.privilegioService.remove(+id);
  }
}
