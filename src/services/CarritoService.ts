import { Carrito } from "../models/Carrito";
import { ICarrito, ICarritoPaginado } from "../interfaces/ICarrito";
import { ejecutarSP } from "../utils/dbUtils";
import { ICarritoConDetalles } from "../interfaces/ICarrito";

export class CarritoService {
  listarTodosCarritos = async (
    page: number,
    limit: number
  ): Promise<ICarritoPaginado> => {
    const offset = (page - 1) * limit;
    const totalItems = await Carrito.count();

    const carritos = await Carrito.findAll({
      include: [
        {
          association: "usuario",
          attributes: { exclude: ["password"] },
        },
        { association: "estado" },
        { association: "detallesCarrito", include: ["producto"] },
      ],
      limit,
      offset,
    });

    return {
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      currentPage: page,
      carritos: carritos as ICarrito[],
    };
  };

  encontrarCarritoPorId = async (
    idCarrito: number
  ): Promise<ICarrito | null> => {
    return await Carrito.findByPk(idCarrito, {
      include: [
        {
          association: "usuario",
          attributes: { exclude: ["password"] },
        },
        { association: "estado" },
        { association: "detallesCarrito", include: ["producto"] },
      ],
    });
  };

  crearCarritoConDetalles = async (
    data: Omit<ICarritoConDetalles, "idCarritoDetalles" | "idCarrito">
  ): Promise<ICarrito | null> => {
    try {
      const detallesJSON = JSON.stringify({ detalles: data.detalles });

      const carritoResult = await ejecutarSP("InsertCarritoConDetalles", {
        idUsuario: data.idUsuario,
        estado_idestado: data.estado_idestado,
        detalles: detallesJSON,
      });

      if (!carritoResult[0][0].idCarrito)
        throw new Error("No se pudo crear el carrito.");

      const idCarrito = carritoResult[0][0].idCarrito;

      return await this.encontrarCarritoPorId(idCarrito);
    } catch (error) {
      throw error;
    }
  };

  inactivarCarrito = async (
    idCarrito: number,
    data: Partial<ICarrito>
  ): Promise<ICarrito | null> => {
    const carritoActual = await this.encontrarCarritoPorId(idCarrito);

    if (!carritoActual) return null;

    await ejecutarSP("SetEstadoCarrito", {
      idCarrito: idCarrito,
      estado: data.estado_idestado,
    });

    return await this.encontrarCarritoPorId(idCarrito);
  };
}

export default new CarritoService();
