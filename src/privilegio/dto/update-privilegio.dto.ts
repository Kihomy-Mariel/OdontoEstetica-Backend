import { PartialType } from '@nestjs/mapped-types';
import { CreatePrivilegioDto } from './create-privilegio.dto';

export class UpdatePrivilegioDto extends PartialType(CreatePrivilegioDto) {}
