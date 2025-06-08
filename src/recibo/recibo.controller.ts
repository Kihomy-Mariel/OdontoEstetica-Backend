import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReciboService } from './recibo.service';
import { CreateReciboDto } from './dto/create-recibo.dto';
import { UpdateReciboDto } from './dto/update-recibo.dto';

@Controller('recibo')
export class ReciboController {
  constructor(private readonly reciboService: ReciboService) {}

  @Post()
  create(@Body() createReciboDto: CreateReciboDto) {
    return this.reciboService.create(createReciboDto);
  }

  @Get()
  findAll() {
    return this.reciboService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reciboService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReciboDto: UpdateReciboDto) {
    return this.reciboService.update(+id, updateReciboDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reciboService.remove(+id);
  }
}
