import { Estado } from "../models/Estado";
import { IEstado } from "../interfaces/IEstado";
import { ejecutarSP } from "../utils/dbUtils";

export class EstadoService {
  async listarTodosEstados(): Promise<IEstado[]> {
    return await Estado.findAll();
  }

  async encontrarPorId(id: number): Promise<IEstado | null> {
    return await Estado.findByPk(id);
  }

  async crearNuevoEstado(data: Omit<IEstado, "idestado">): Promise<IEstado> {
    const estadoExistente = await Estado.findOne({
      where: { nombre: data.nombre },
    });
    if (estadoExistente) throw new Error("Estado ya existe.");

    const estado = await ejecutarSP("InsertEstado", {
      nombre: data.nombre,
    });

    if (!estado[0][0].idestado) throw new Error("No se pudo crear el estado.");

    return (await Estado.findByPk(estado[0][0].idestado)) as IEstado;
  }

  async actualizarEstado(id: number, data: Partial<IEstado>): Promise<IEstado> {
    const estadoActual = await this.encontrarPorId(id);

    if (!estadoActual) {
      throw new Error("Estado no encontrado.");
    }

    await ejecutarSP("UpdateEstado", {
      idestado: id,
      nombre: data.nombre || estadoActual.nombre,
    });

    return (await this.encontrarPorId(id)) as IEstado;
  }
}
