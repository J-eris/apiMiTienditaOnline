import { Cliente } from "../models/Cliente";
import { ICliente } from "../interfaces/ICliente";
import { ejecutarSP } from "../utils/dbUtils";

export class ClienteService {
  async listarTodosClientes(): Promise<ICliente[]> {
    return await Cliente.findAll();
  }

  async encontrarPorId(id: number): Promise<ICliente | null> {
    return await Cliente.findByPk(id);
  }

  async crearNuevoCliente(
    data: Omit<ICliente, "idClientes">
  ): Promise<ICliente> {
    const clienteExistente = await Cliente.findOne({
      where: { razon_social: data.razon_social },
    });
    if (clienteExistente) throw new Error("Cliente ya existe.");

    const cliente = await ejecutarSP("InsertCliente", {
      razon_social: data.razon_social,
      nombre_comercial: data.nombre_comercial || null,
      direccion_entrega: data.direccion_entrega || null,
      email: data.email || null,
      telefono: data.telefono || null,
      estado_idestado: data.estado_idestado || null,
    });

    if (!cliente[0][0].idClientes)
      throw new Error("No se pudo crear el cliente.");

    return (await Cliente.findByPk(cliente[0][0].idClientes)) as ICliente;
  }

  async actualizarCliente(
    id: number,
    data: Partial<ICliente>
  ): Promise<ICliente> {
    const clienteActual = await this.encontrarPorId(id);

    if (!clienteActual) {
      throw new Error("Cliente no encontrado.");
    }

    await ejecutarSP("UpdateCliente", {
      idClientes: id,
      razon_social: data.razon_social,
      nombre_comercial: data.nombre_comercial,
      direccion_entrega: data.direccion_entrega,
      email: data.email,
      telefono: data.telefono,
      estado_idestado: data.estado_idestado,
    });

    return (await this.encontrarPorId(id)) as ICliente;
  }

  async cambiarEstadoCliente(
    id: number,
    data: Partial<ICliente>
  ): Promise<ICliente> {
    const clienteActual = await this.encontrarPorId(id);

    if (!clienteActual) {
      throw new Error("Cliente no encontrado.");
    }

    await ejecutarSP("SetEstadoCliente", {
      idCliente: id,
      estado: data.estado_idestado,
    });

    return (await this.encontrarPorId(id)) as ICliente;
  }
}
