// src/archivo-clinico/archivo-clinico.controller.ts
import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  UseGuards,
  Patch,
  Param,
 // Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ArchivoClinicoService } from './archivo-clinico.service';
import { CreateArchivoClinicoDto } from './dto/create-archivo-clinico.dto';
import { UpdateArchivoClinicoDto } from './dto/update-archivo-clinico.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { RolesGuard } from 'common/guards/roles.guard';
import { Roles } from 'common/decorators/roles.decorator';
import { Express } from 'express';

@Controller('archivo-clinico')
export class ArchivoClinicoController {
  constructor(private readonly service: ArchivoClinicoService) {}

  @Post()
  create(@Body() dto: CreateArchivoClinicoDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArchivoClinicoDto,
  ) {
    return this.service.update(id, dto);
  }
/*
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }*/

  @Get('historial/:idHistorial')
  findByHistorial(@Param('idHistorial', ParseIntPipe) id: number) {
    return this.service.findByHistorial(id);
  }
  @UseGuards(RolesGuard)
@Roles(5,4,2,1)
@Post('upload')
@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Tipo de archivo no permitido'), false);
    }
    cb(null, true);
  },
}))
async uploadFile(
  @UploadedFile() file: Express.Multer.File,
  @Body() dto: CreateArchivoClinicoDto,
) {
  dto.URL = `/uploads/${file.filename}`;
  dto.tipoArchivo = file.mimetype;
  dto.fechaSubida = new Date().toISOString().split('T')[0];
  return this.service.create(dto);
}
 /* @Get('historial/:idHistorial/:idArchivo')
  findOneByHistorial(
    @Param('idHistorial', ParseIntPipe) idHistorial: number,
    @Param('idArchivo', ParseIntPipe) idArchivo: number,
  ) {
    return this.service.findOneByHistorial(idHistorial, idArchivo);
  }
  */
}
