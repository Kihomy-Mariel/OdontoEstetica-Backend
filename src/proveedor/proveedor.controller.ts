import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';

@Controller('proveedor')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Post()
  create(@Body() createDto: CreateProveedorDto) {
    return this.proveedorService.create(createDto);
  }

  @Get()
  findAll() {
    return this.proveedorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proveedorService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateProveedorDto) {
    return this.proveedorService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proveedorService.remove(+id);
  }
}
