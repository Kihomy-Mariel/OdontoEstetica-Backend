// src/odontograma/dto/odontograma-con-dientes.dto.ts
export class OdontogramaConDientesDto {
  idOdontograma: number;
  tipo: string;
  descripcion: string;
  archivoURL?: string;
  dientes: Array<{
    numero: number;
    estado: 'sano'|'caries'|'obturado'|'extraido'|'corona'|'endodoncia';
  }>;
}
