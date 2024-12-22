export interface ICategoriaProducto {
  idCategoriaProductos: number;
  nombre: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  estado_idestado: number;
}

export interface ICategoriaProductoPaginado {
  categorias: ICategoriaProducto[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}
