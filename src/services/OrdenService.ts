import { Orden } from "../models/Orden";
import { IOrden } from "../interfaces/IOrden";
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

  encontrarPorId = async (id: number): Promise<IOrden | null> => {
    return await Orden.findByPk(id, {
      include: [
        { association: "usuario", attributes: { exclude: ["password"] } },
        { association: "estado" },
        { association: "detallesOrden", include: ["producto"] },
      ],
    });
  };

  crearOrdenConDetalles = async (data: {
    idUsuario: number;
    estado_idestado: number;
    nombre_completo: string;
    direccion: string;
    telefono: string;
    correo_electronico: string;
    fecha_entrega: Date;
    total_orden: number;
    detalles: Omit<IOrdenDetalles, "idOrdenDetalles" | "Orden_idOrden">[];
  }): Promise<IOrden | null> => {
    try {
      const detallesJSON = JSON.stringify({ detalles: data.detalles });

      const ordenResult = await ejecutarSP("InsertOrdenConDetalles", {
        usuarios_idusuarios: data.idUsuario,
        estados_idestado: data.estado_idestado,
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

      return await this.encontrarPorId(idOrden);
    } catch (error) {
      throw error;
    }
  };

  actualizarOrden = async (
    id: number,
    data: Partial<IOrden>
  ): Promise<IOrden | null> => {
    const ordenActual = await this.encontrarPorId(id);

    if (!ordenActual) return null;

    await ejecutarSP("UpdateOrden", {
      idOrden: id,
      usuarios_idusuarios: data.usuarios_idusuarios,
      estados_idestado: data.estados_idestado,
      nombre_completo: data.nombre_completo,
      direccion: data.direccion,
      telefono: data.telefono,
      correo_electronico: data.correo_electronico,
      fecha_entrega: data.fecha_entrega,
      total_orden: data.total_orden,
    });

    return (await this.encontrarPorId(id)) as IOrden;
  };

  cambiarEstado = async (
    id: number,
    estado_idestado: number
  ): Promise<IOrden | null> => {
    const ordenActual = await this.encontrarPorId(id);

    if (!ordenActual) return null;

    await ejecutarSP("SetEstadoOrden", {
      idOrden: id,
      estado: estado_idestado,
    });

    return (await this.encontrarPorId(id)) as IOrden;
  };
}

export default new OrdenService();
