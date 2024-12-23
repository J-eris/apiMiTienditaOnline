import { Estado } from "../models/Estado";
import { IEstado, IEstadoPaginado } from "../interfaces/IEstado";
import { ejecutarSP } from "../utils/dbUtils";

export class EstadoService {
  async listarTodosEstados(
    page: number,
    limit: number
  ): Promise<IEstadoPaginado> {
    const offset = (page - 1) * limit;
    const totalItems = await Estado.count();

    const estados = await Estado.findAll({ limit, offset });

    return {
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      currentPage: page,
      estados: estados as IEstado[],
    };
  }

  encontrarEstadoPorId = async (idEstado: number): Promise<IEstado | null> => {
    return await Estado.findByPk(idEstado);
  };

  encontrarEstadoPorNombre = async (
    nombre: string
  ): Promise<IEstado | null> => {
    return await Estado.findOne({ where: { nombre } });
  };

  crearNuevoEstado = async (
    data: Omit<IEstado, "idestado">
  ): Promise<IEstado | null> => {
    const estadoExistente = await this.encontrarEstadoPorNombre(data.nombre);
    if (estadoExistente) return null;

    const estado = await ejecutarSP("InsertEstado", {
      nombre: data.nombre,
    });

    if (!estado) throw new Error("No se pudo crear el estado.");

    return estado[0][0] as IEstado;
  };

  actualizarEstado = async (
    idEstado: number,
    data: Partial<IEstado>
  ): Promise<IEstado | null> => {
    const estadoActual = await this.encontrarEstadoPorId(idEstado);

    if (!estadoActual) return null;

    await ejecutarSP("UpdateEstado", {
      idestado: idEstado,
      nombre: data.nombre || estadoActual.nombre,
    });

    return (await this.encontrarEstadoPorId(idEstado)) as IEstado;
  };
}
