import { Carrito } from "../models/Carrito";
import { CarritoDetalles } from "../models/CarritoDetalles";
import { ICarrito } from "../interfaces/ICarrito";
import { ICarritoDetalles } from "../interfaces/ICarritoDetalles";
import { ejecutarSP } from "../utils/dbUtils";

export class CarritoService {
  listarTodosCarritos = async (): Promise<ICarrito[]> => {
    return await Carrito.findAll({
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

  encontrarPorId = async (id: number): Promise<ICarrito | null> => {
    return await Carrito.findByPk(id, {
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

  crearCarritoConDetalles = async (data: {
    idUsuario: number;
    estado_idestado: number;
    detalles: Omit<ICarritoDetalles, "idCarritoDetalles" | "idCarrito">[];
  }): Promise<ICarrito | null> => {
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

      return await this.encontrarPorId(idCarrito);
    } catch (error) {
      throw error;
    }
  };

  eliminarCarrito = async (id: number): Promise<boolean | null> => {
    const carrito = await this.encontrarPorId(id);

    if (!carrito) return null;

    await ejecutarSP("DeleteCarrito", { idCarrito: id });

    return true;
  };
}

export default new CarritoService();
