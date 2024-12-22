import { CategoriaProducto } from "../models/CategoriaProducto";
import {
  ICategoriaProducto,
  ICategoriaProductoPaginado,
} from "../interfaces/ICategoriaProducto";
import { ejecutarSP } from "../utils/dbUtils";

export class CategoriaService {
  listarTodasCategorias = async (
    page: number,
    limit: number
  ): Promise<ICategoriaProductoPaginado> => {
    const offset = (page - 1) * limit;
    const totalItems = await CategoriaProducto.count();

    const categorias = await CategoriaProducto.findAll({
      include: ["estado", "productos"],
      limit,
      offset,
    });

    return {
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      currentPage: page,
      categorias: categorias as ICategoriaProducto[],
    };
  };

  encontrarCategoriaPorId = async (
    idCategoria: number
  ): Promise<ICategoriaProducto | null> => {
    return await CategoriaProducto.findByPk(idCategoria, {
      include: ["estado", "productos"],
    });
  };

  encontrarCategoriaPorNombre = async (
    nombre: string
  ): Promise<ICategoriaProducto | null> => {
    return await CategoriaProducto.findOne({ where: { nombre } });
  };

  crearNuevaCategoria = async (
    data: Omit<
      ICategoriaProducto,
      "idCategoriaProductos" | "fecha_creacion" | "fecha_actualizacion"
    >
  ): Promise<ICategoriaProducto | null> => {
    const categoriaExistente = await this.encontrarCategoriaPorNombre(
      data.nombre
    );
    if (categoriaExistente) return null;

    const categoria = await ejecutarSP("InsertCategoriaProducto", {
      nombre: data.nombre,
      estado_idestado: data.estado_idestado,
    });

    if (!categoria) throw new Error("No se pudo crear la categoría.");

    return categoria[0][0] as ICategoriaProducto;
  };

  actualizarCategoria = async (
    idCategoria: number,
    data: Partial<ICategoriaProducto>
  ): Promise<ICategoriaProducto | null> => {
    const categoriaActual = await this.encontrarCategoriaPorId(idCategoria);

    if (!categoriaActual) return null;

    await ejecutarSP("UpdateCategoriaProducto", {
      idCategoriaProductos: idCategoria,
      nombre: data.nombre,
      estado_idestado: data.estado_idestado,
    });

    return (await this.encontrarCategoriaPorId(
      idCategoria
    )) as ICategoriaProducto;
  };

  cambiarEstado = async (
    idCategoria: number,
    estado_idestado: number
  ): Promise<ICategoriaProducto | null> => {
    const categoriaActual = await this.encontrarCategoriaPorId(idCategoria);

    if (!categoriaActual) return null;

    await ejecutarSP("SetEstadoCategoriaProducto", {
      idCategoria: idCategoria,
      estado: estado_idestado,
    });

    return (await this.encontrarCategoriaPorId(
      idCategoria
    )) as ICategoriaProducto;
  };
}

export default new CategoriaService();
