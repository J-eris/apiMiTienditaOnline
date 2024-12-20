import { CategoriaProducto } from "../models/CategoriaProducto";
import { ICategoriaProducto } from "../interfaces/ICategoriaProducto";
import { ejecutarSP } from "../utils/dbUtils";

export class CategoriaService {
  listarTodasCategorias = async (): Promise<ICategoriaProducto[]> => {
    return await CategoriaProducto.findAll({
      include: ["estado", "productos"],
    });
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

    if (!categoria[0][0].idCategoriaProductos)
      throw new Error("No se pudo crear la categoría.");

    return (await this.encontrarCategoriaPorId(
      categoria[0][0].idCategoriaProductos
    )) as ICategoriaProducto;
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
