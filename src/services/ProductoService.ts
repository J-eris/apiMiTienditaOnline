import { Producto } from "../models/Producto";
import { IProducto } from "../interfaces/IProducto";
import { ejecutarSP } from "../utils/dbUtils";

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

  encontrarPorId = async (id: number): Promise<IProducto | null> => {
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

  encontrarPorCodigo = async (codigo: string): Promise<IProducto | null> => {
    return await Producto.findOne({ where: { codigo } });
  };

  crearNuevoProducto = async (
    data: Omit<
      IProducto,
      "idProductos" | "fecha_creacion" | "fecha_actualizacion"
    >
  ): Promise<IProducto | null> => {
    const productoExistente = await this.encontrarPorCodigo(data.codigo || "");
    if (productoExistente) return null;

    const producto = await ejecutarSP("InsertProducto", {
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

    if (!producto[0][0].idProductos)
      throw new Error("No se pudo crear el producto.");

    return (await Producto.findByPk(producto[0][0].idProductos)) as IProducto;
  };

  actualizarProducto = async (
    id: number,
    data: Partial<IProducto>
  ): Promise<IProducto | null> => {
    const productoActual = await this.encontrarPorId(id);

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

    return (await this.encontrarPorId(id)) as IProducto;
  };

  cambiarEstadoProducto = async (
    id: number,
    estado_idestado: number
  ): Promise<IProducto | null> => {
    const productoActual = await this.encontrarPorId(id);

    if (!productoActual) return null;

    await ejecutarSP("SetEstadoProducto", {
      idProducto: id,
      estado: estado_idestado,
    });

    return (await this.encontrarPorId(id)) as IProducto;
  };
}

export default new ProductoService();
