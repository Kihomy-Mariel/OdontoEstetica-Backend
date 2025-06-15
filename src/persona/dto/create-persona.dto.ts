
import {
    IsString,
    IsNotEmpty,
    IsEmail,
    IsDateString,
    IsOptional,
    IsMobilePhone,
    IsBoolean,
    Matches,
} from 'class-validator';

export class CreatePersonaDto {
    @IsString() @IsNotEmpty() nombres: string;
    @IsString() @IsNotEmpty() apellidoPaterno: string;
    @IsString() @IsNotEmpty() apellidoMaterno: string;
    @IsString() @IsNotEmpty() ci: string;
    @IsDateString() fechaNacimiento: string;
    @IsString()
    @Matches(/^\d{7,8}$/, { message: 'El teléfono debe tener 7 u 8 dígitos numéricos' })
    telefono: string;

    @IsEmail() @IsNotEmpty() email: string;
    //@IsBoolean()                     habilitado: boolean;
    // fechaRegistro la ponemos en el servicio automáticamente
    // idUsuario se asigna después al crear la entidad
}
