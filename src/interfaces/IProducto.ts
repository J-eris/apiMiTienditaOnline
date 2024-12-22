import { IProductoImagen } from "./IProductoImagen";

export interface IProducto {
  idProductos: number;
  CategoriaProductos_idCategoriaProductos: number;
  usuarios_idusuarios: number;
  nombre: string;
  marca?: string;
  codigo?: string;
  stock: number;
  precio: number;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  estado_idestado: number;
}

export interface IProductoPaginado {
  productos: IProducto[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

export interface IProductoConImagenes extends IProducto {
  imagenes: IProductoImagen[];
}
