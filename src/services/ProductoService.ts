import { Producto } from "../models/Producto";
import { IProducto, IProductoConImagenes } from "../interfaces/IProducto";
import { IProductoImagen } from "../interfaces/IProductoImagen";
import { ejecutarSP } from "../utils/dbUtils";
import { ProductoImagen } from "../models/ProductoImagen";

export class ProductoService {
  listarTodosProductos = async (): Promise<IProducto[]> => {
    return await Producto.findAll({
      include: [
        { association: "categoriaProducto" },
        { association: "usuario", attributes: { exclude: ["password"] } },
        { association: "estado" },
        { association: "imagenes" },
        { association: "ordenDetalles" },
      ],
    });
  };

  encontrarProductoPorId = async (id: number): Promise<IProducto | null> => {
    return await Producto.findByPk(id, {
      include: [
        { association: "categoriaProducto" },
        { association: "usuario", attributes: { exclude: ["password"] } },
        { association: "estado" },
        { association: "imagenes" },
        { association: "ordenDetalles" },
      ],
    });
  };

  encontrarImagenPorId = async (
    id: number
  ): Promise<IProductoImagen | null> => {
    return await ProductoImagen.findByPk(id, {
      include: [{ association: "producto" }],
    });
  };

  encontrarPorCodigo = async (codigo: string): Promise<IProducto | null> => {
    return await Producto.findOne({ where: { codigo } });
  };

  crearProductoConImagenes = async (
    data: Omit<
      IProductoConImagenes,
      "idProductos" | "fecha_creacion" | "fecha_actualizacion"
    >
  ): Promise<IProducto | null> => {
    console.log(data);
    try {
      const imagenesJSON = data.imagenes
        ? JSON.stringify({ imagenes: data.imagenes })
        : null;

      const producto = await ejecutarSP("InsertProductoConImagenes", {
        CategoriaProductos_idCategoriaProductos:
          data.CategoriaProductos_idCategoriaProductos,
        usuarios_idusuarios: data.usuarios_idusuarios,
        nombre: data.nombre,
        marca: data.marca,
        codigo: data.codigo,
        stock: data.stock,
        precio: data.precio,
        estado_idestado: data.estado_idestado,
        imagenes: imagenesJSON,
      });

      if (!producto[0][0].idProductos)
        throw new Error("No se pudo crear el producto.");

      const idProductos = producto[0][0].idProductos;

      return await this.encontrarProductoPorId(idProductos);
    } catch (error) {
      throw error;
    }
  };

  actualizarProducto = async (
    id: number,
    data: Partial<IProducto>
  ): Promise<IProducto | null> => {
    const productoActual = await this.encontrarProductoPorId(id);

    if (!productoActual) return null;

    await ejecutarSP("UpdateProducto", {
      idProductos: id,
      nombre: data.nombre,
      marca: data.marca,
      codigo: data.codigo,
      stock: data.stock,
      precio: data.precio,
      CategoriaProductos_idCategoriaProductos:
        data.CategoriaProductos_idCategoriaProductos,
      usuarios_idusuarios: data.usuarios_idusuarios,
      estado_idestado: data.estado_idestado,
    });

    return (await this.encontrarProductoPorId(id)) as IProducto;
  };

  actualizarProductoImagen = async (
    idImagen: number,
    data: Partial<IProductoImagen>
  ): Promise<IProductoImagen | null> => {
    try {
      await ejecutarSP("UpdateProductoImagen", {
        idImagen,
        idProducto: data.idProducto,
        ruta_imagen: data.ruta_imagen,
        descripcion: data.descripcion,
      });

      return await this.encontrarImagenPorId(idImagen);
    } catch (error) {
      throw error;
    }
  };

  cambiarEstadoProducto = async (
    id: number,
    estado_idestado: number
  ): Promise<IProducto | null> => {
    const productoActual = await this.encontrarProductoPorId(id);

    if (!productoActual) return null;

    await ejecutarSP("SetEstadoProducto", {
      idProducto: id,
      estado: estado_idestado,
    });

    return (await this.encontrarProductoPorId(id)) as IProducto;
  };

  eliminarImagenProducto = async (id: number): Promise<boolean | null> => {
    const imagen = await this.encontrarImagenPorId(id);

    if (!imagen) return null;

    await ejecutarSP("DeleteProductoImagen", { idImagen: id });

    return true;
  };
}

export default new ProductoService();
