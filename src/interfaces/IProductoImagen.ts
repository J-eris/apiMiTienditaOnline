export interface IProductoImagen {
  idImagen: number;
  idProducto: number;
  ruta_imagen: string;
  descripcion?: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}
