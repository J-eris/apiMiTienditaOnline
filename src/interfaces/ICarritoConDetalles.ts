import { ICarritoDetalles } from "./ICarritoDetalles";

export interface ICarritoConDetalles {
  idUsuario: number;
  estado_idestado: number;
  detalles: ICarritoDetalles[];
}
