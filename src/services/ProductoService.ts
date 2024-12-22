import { Producto } from "../models/Producto";
import {
  IProducto,
  IProductoConImagenes,
  IProductoPaginado,
} from "../interfaces/IProducto";
import { IProductoImagen } from "../interfaces/IProductoImagen";
import { ejecutarSP, ejecutarVista } from "../utils/dbUtils";
import { ProductoImagen } from "../models/ProductoImagen";
import { QueryTypes } from "sequelize";
import sequelize from "../config/database";

export class ProductoService {
  listarTodosProductos = async (
    page: number,
    limit: number
  ): Promise<IProductoPaginado> => {
    const offset = (page - 1) * limit;
    const totalItems = await Producto.count();

    const productos = await Producto.findAll({
      include: [
        { association: "categoriaProducto" },
        { association: "usuario", attributes: { exclude: ["password"] } },
        { association: "estado" },
        { association: "imagenes" },
      ],
      limit,
      offset,
    });

    return {
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      currentPage: page,
      productos: productos as IProducto[],
    };
  };

  encontrarProductoPorId = async (
    idProducto: number
  ): Promise<IProducto | null> => {
    return await Producto.findByPk(idProducto, {
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
    idImagen: number
  ): Promise<IProductoImagen | null> => {
    return await ProductoImagen.findByPk(idImagen, {
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
      const productoExistente = await this.encontrarPorCodigo(
        data.codigo || ""
      );

      if (productoExistente) return null;

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
    idProducto: number,
    data: Partial<IProducto>
  ): Promise<IProducto | null> => {
    const productoActual = await this.encontrarProductoPorId(idProducto);

    if (!productoActual) return null;

    await ejecutarSP("UpdateProducto", {
      idProductos: idProducto,
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

    return (await this.encontrarProductoPorId(idProducto)) as IProducto;
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
    idProducto: number,
    estado_idestado: number
  ): Promise<IProducto | null> => {
    const productoActual = await this.encontrarProductoPorId(idProducto);

    if (!productoActual) return null;

    await ejecutarSP("SetEstadoProducto", {
      idProducto: idProducto,
      estado: estado_idestado,
    });

    return (await this.encontrarProductoPorId(idProducto)) as IProducto;
  };

  actualizarStockProducto = async (
    idProducto: number,
    cantidad: number,
    incremento: boolean
  ): Promise<Producto | null> => {
    const productoActual = await this.encontrarProductoPorId(idProducto);

    if (!productoActual) return null;

    const producto = await ejecutarSP("ActualizarStockProducto", {
      idProducto: idProducto,
      cantidad: cantidad,
      incremento: incremento,
    });

    if (!producto) throw new Error("No se pudo actualizar el stock.");

    return (await producto[0][0]) as Producto;
  };

  obtenerDetallesProducto = async (
    idProducto: number
  ): Promise<IProductoConImagenes | null> => {
    const detalles = await ejecutarSP("GetProductoDetalles", { idProducto });

    return (await detalles[0]) as IProductoConImagenes;
  };

  obtenerProductosPorCategoria = async (
    idCategoria: number
  ): Promise<IProducto[]> => {
    const productos = await ejecutarSP("GetProductosPorCategoria", {
      idCategoriaProductos: idCategoria,
    });

    return (await productos[0]) as IProducto[];
  };

  obtenerTotalProductosActivos = async (): Promise<number> => {
    const total = await ejecutarVista("TotalProductosActivosConStock");
    return total[0];
  };

  obtenerProductosMasVendidos = async (): Promise<IProducto[]> => {
    const productos = await ejecutarVista("Top10ProductosMasVendidos");
    return await productos;
  };

  eliminarImagenProducto = async (
    idImagen: number
  ): Promise<boolean | null> => {
    const imagen = await this.encontrarImagenPorId(idImagen);

    if (!imagen) return null;

    await ejecutarSP("DeleteProductoImagen", { idImagen: idImagen });

    return true;
  };
}

export default new ProductoService();
