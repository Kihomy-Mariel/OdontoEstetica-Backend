import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReciboService } from './recibo.service';
import { CreateReciboDto } from './dto/create-recibo.dto';
import { UpdateReciboDto } from './dto/update-recibo.dto';
import { Recibo } from './entities/recibo.entity';

@Controller('recibo')
export class ReciboController {
  constructor(private readonly reciboService: ReciboService) {}

  @Post()
  create(@Body() createReciboDto: CreateReciboDto): Promise<Recibo> {
    return this.reciboService.create(createReciboDto);
  }

  @Get()
  findAll(): Promise<Recibo[]> {
    return this.reciboService.findAll();
  }

  @Get('pago/:idPago')
  findByPago(@Param('idPago') idPago: string): Promise<Recibo | null> {
    return this.reciboService.findByPago(+idPago);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Recibo> {
    return this.reciboService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReciboDto: UpdateReciboDto): Promise<Recibo> {
    return this.reciboService.update(+id, updateReciboDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.reciboService.remove(+id);
  }
}
