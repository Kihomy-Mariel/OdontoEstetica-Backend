import { PartialType } from '@nestjs/mapped-types';
import { CreateRolPrivilegioDto } from './create-rol-privilegio.dto';

export class UpdateRolPrivilegioDto extends PartialType(CreateRolPrivilegioDto) {}
