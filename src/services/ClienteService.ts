import { Cliente } from "../models/Cliente";
import { ICliente } from "../interfaces/ICliente";
import { ejecutarSP } from "../utils/dbUtils";

export class ClienteService {
  listarTodosClientes = async (): Promise<ICliente[]> => {
    return await Cliente.findAll();
  };

  encontrarPorId = async (id: number): Promise<ICliente | null> => {
    return await Cliente.findByPk(id);
  };

  crearNuevoCliente = async (
    data: Omit<ICliente, "idClientes">
  ): Promise<ICliente | null> => {
    const clienteExistente = await Cliente.findOne({
      where: { razon_social: data.razon_social },
    });
    if (clienteExistente) return null;

    const cliente = await ejecutarSP("InsertCliente", {
      razon_social: data.razon_social,
      nombre_comercial: data.nombre_comercial || null,
      direccion_entrega: data.direccion_entrega || null,
      email: data.email || null,
      telefono: data.telefono || null,
      estado_idestado: data.estado_idestado || null,
    });

    if (!cliente[0][0].idClientes) throw new Error("No se pudo crear el cliente.");

    return (await Cliente.findByPk(cliente[0][0].idClientes)) as ICliente;
  };

  actualizarCliente = async (
    id: number,
    data: Partial<ICliente>
  ): Promise<ICliente | null> => {
    const clienteActual = await this.encontrarPorId(id);

    if (!clienteActual) return null;

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
  };

  cambiarEstadoCliente = async (
    id: number,
    data: Partial<ICliente>
  ): Promise<ICliente | null> => {
    const clienteActual = await this.encontrarPorId(id);

    if (!clienteActual) return null;

    await ejecutarSP("SetEstadoCliente", {
      idCliente: id,
      estado: data.estado_idestado,
    });

    return (await this.encontrarPorId(id)) as ICliente;
  };
}
