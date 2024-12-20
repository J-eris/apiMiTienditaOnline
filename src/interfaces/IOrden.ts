import { IOrdenDetalles } from "./IOrdenDetalles";

export interface IOrden {
  idOrden: number;
  usuarios_idusuarios: number;
  estados_idestado: number;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  nombre_completo: string;
  direccion: string;
  telefono: string;
  correo_electronico: string;
  fecha_entrega: Date;
  total_orden: number;
}

export interface IOrdenConDetalles extends IOrden {
  detalles: IOrdenDetalles[];
}
