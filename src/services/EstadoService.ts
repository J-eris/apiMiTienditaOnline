import { Estado } from "../models/Estado";
import { IEstado } from "../interfaces/IEstado";
import { ejecutarSP } from "../utils/dbUtils";

export class EstadoService {
  async listarTodosEstados(): Promise<IEstado[]> {
    return await Estado.findAll();
  }

  encontrarEstadoPorId = async (id: number): Promise<IEstado | null> => {
    return await Estado.findByPk(id);
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

    if (!estado[0][0].idestado) throw new Error("No se pudo crear el estado.");

    return (await this.encontrarEstadoPorId(estado[0][0].idestado)) as IEstado;
  };

  actualizarEstado = async (
    id: number,
    data: Partial<IEstado>
  ): Promise<IEstado | null> => {
    const estadoActual = await this.encontrarEstadoPorId(id);

    if (!estadoActual) return null;

    await ejecutarSP("UpdateEstado", {
      idestado: id,
      nombre: data.nombre || estadoActual.nombre,
    });

    return (await this.encontrarEstadoPorId(id)) as IEstado;
  };
}
