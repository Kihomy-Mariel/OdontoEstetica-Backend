// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
  ) { }

  async findByUsername(username: string): Promise<Usuario | null> {
    return this.userRepository.findOne({
      where: { username },
      relations: [
        'persona',
        'rol',
        'rol.rolPrivilegios',
        'rol.rolPrivilegios.privilegio',
      ],
    });
  }
}
