import { Orden } from "../models/Orden";
import { IOrden, IOrdenConDetalles } from "../interfaces/IOrden";
import { ejecutarSP } from "../utils/dbUtils";
import { IOrdenDetalles } from "../interfaces/IOrdenDetalles";

export class OrdenService {
  listarTodasOrdenes = async (): Promise<IOrden[]> => {
    return await Orden.findAll({
      include: [
        { association: "usuario", attributes: { exclude: ["password"] } },
        { association: "estado" },
        { association: "detallesOrden", include: ["producto"] },
      ],
    });
  };

  encontrarOrdenPorId = async (id: number): Promise<IOrden | null> => {
    return await Orden.findByPk(id, {
      include: [
        { association: "usuario", attributes: { exclude: ["password"] } },
        { association: "estado" },
        { association: "detallesOrden", include: ["producto"] },
      ],
    });
  };

  crearOrdenConDetalles = async (
    data: Omit<
      IOrdenConDetalles,
      "idOrden" | "fecha_creacion" | "fecha_actualizacion" | "idOrdenDetalles"
    >
  ): Promise<IOrden | null> => {
    try {
      const detallesJSON = JSON.stringify({ detalles: data.detalles });

      const ordenResult = await ejecutarSP("InsertOrdenConDetalles", {
        usuarios_idusuarios: data.usuarios_idusuarios,
        estados_idestado: data.estados_idestado,
        nombre_completo: data.nombre_completo,
        direccion: data.direccion,
        telefono: data.telefono,
        correo_electronico: data.correo_electronico,
        fecha_entrega: data.fecha_entrega,
        total_orden: data.total_orden,
        detalles: detallesJSON,
      });

      if (!ordenResult[0][0].idOrden)
        throw new Error("No se pudo crear la orden.");

      const idOrden = ordenResult[0][0].idOrden;

      return await this.encontrarOrdenPorId(idOrden);
    } catch (error) {
      throw error;
    }
  };

  actualizarOrden = async (
    idOrden: number,
    data: Partial<IOrden>
  ): Promise<IOrden | null> => {
    const ordenActual = await this.encontrarOrdenPorId(idOrden);

    if (!ordenActual) return null;

    await ejecutarSP("UpdateOrden", {
      idOrden: idOrden,
      usuarios_idusuarios: data.usuarios_idusuarios,
      estados_idestado: data.estados_idestado,
      nombre_completo: data.nombre_completo,
      direccion: data.direccion,
      telefono: data.telefono,
      correo_electronico: data.correo_electronico,
      fecha_entrega: data.fecha_entrega,
      total_orden: data.total_orden,
    });

    return (await this.encontrarOrdenPorId(idOrden)) as IOrden;
  };

  obtenerDetallesOrden = async (
    idOrden: number
  ): Promise<IOrdenDetalles[] | null> => {
    const detallesOrden = await ejecutarSP("GetOrdenDetalles", { idOrden });

    if (!detallesOrden) return null;

    return detallesOrden[0] as IOrdenDetalles[];
  };

  cambiarEstado = async (
    idOrden: number,
    estado_idestado: number
  ): Promise<IOrden | null> => {
    const ordenActual = await this.encontrarOrdenPorId(idOrden);

    if (!ordenActual) return null;

    await ejecutarSP("SetEstadoOrden", {
      idOrden: idOrden,
      estado: estado_idestado,
    });

    return (await this.encontrarOrdenPorId(idOrden)) as IOrden;
  };
}

export default new OrdenService();
