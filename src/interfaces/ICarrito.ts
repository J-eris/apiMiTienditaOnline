import { ICarritoDetalles } from "./ICarritoDetalles";

export interface ICarrito {
  idCarrito: number;
  idUsuario: number;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
  estado_idestado: number;
}

export interface ICarritoPaginado {
  carritos: ICarrito[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

export interface ICarritoConDetalles extends ICarrito {
  detalles: ICarritoDetalles[];
}
