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
