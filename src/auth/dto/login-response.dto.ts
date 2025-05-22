export class LoginResponseDto {
  token: string;
  id: number;
  username: string;
  idRol: number;
  rol: string;
  privilegios: string[];

  persona: {
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    ci: string;
    fechaNacimiento: Date;
    telefono: string;
    email: string;
    fechaRegistro: Date;
  };
}
