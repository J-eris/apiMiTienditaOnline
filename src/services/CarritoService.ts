import { Carrito } from "../models/Carrito";
import { ICarrito } from "../interfaces/ICarrito";
import { ejecutarSP } from "../utils/dbUtils";
import { ICarritoDetalles } from "../interfaces/ICarritoDetalles";
import { ICarritoConDetalles } from "../interfaces/ICarritoConDetalles";

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

  encontrarCarritoPorId = async (id: number): Promise<ICarrito | null> => {
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

  eliminarCarrito = async (id: number): Promise<boolean | null> => {
    const carrito = await this.encontrarCarritoPorId(id);

    if (!carrito) return null;

    await ejecutarSP("DeleteCarrito", { idCarrito: id });

    return true;
  };
}

export default new CarritoService();
