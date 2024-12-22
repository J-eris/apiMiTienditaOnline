import { Cliente } from "../models/Cliente";
import { ICliente, IClientePaginado } from "../interfaces/ICliente";
import { ejecutarSP, ejecutarVista } from "../utils/dbUtils";

export class ClienteService {
  listarTodosClientes = async (
    page: number,
    limit: number
  ): Promise<IClientePaginado> => {
    const offset = (page - 1) * limit;
    const totalItems = await Cliente.count();

    const clientes = await Cliente.findAll({
      include: ["estado"],
      limit,
      offset,
    });

    return {
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      currentPage: page,
      clientes: clientes as ICliente[],
    };
  };

  encontrarClientePorId = async (
    idCliente: number
  ): Promise<ICliente | null> => {
    return await Cliente.findByPk(idCliente, { include: ["estado"] });
  };

  encontrarPorRazonSocial = async (
    razon_social: string
  ): Promise<ICliente | null> => {
    return await Cliente.findOne({ where: { razon_social } });
  };

  crearNuevoCliente = async (
    data: Omit<ICliente, "idClientes">
  ): Promise<ICliente | null> => {
    const clienteExistente = await this.encontrarPorRazonSocial(
      data.razon_social
    );
    if (clienteExistente) return null;

    const cliente = await ejecutarSP("InsertCliente", {
      razon_social: data.razon_social,
      nombre_comercial: data.nombre_comercial,
      direccion_entrega: data.direccion_entrega,
      email: data.email,
      telefono: data.telefono,
      estado_idestado: data.estado_idestado,
    });

    if (!cliente[0][0].idClientes)
      throw new Error("No se pudo crear el cliente.");

    return (await this.encontrarClientePorId(
      cliente[0][0].idClientes
    )) as ICliente;
  };

  actualizarCliente = async (
    idCliente: number,
    data: Partial<ICliente>
  ): Promise<ICliente | null> => {
    const clienteActual = await this.encontrarClientePorId(idCliente);

    if (!clienteActual) return null;

    await ejecutarSP("UpdateCliente", {
      idClientes: idCliente,
      razon_social: data.razon_social,
      nombre_comercial: data.nombre_comercial,
      direccion_entrega: data.direccion_entrega,
      email: data.email,
      telefono: data.telefono,
      estado_idestado: data.estado_idestado,
    });

    return (await this.encontrarClientePorId(idCliente)) as ICliente;
  };

  obtener10ClientesMayorConsumo = async (): Promise<ICliente[]> => {
    const clientes = await ejecutarVista("Top10ClientesMayorConsumo");
    return clientes;
  };

  cambiarEstadoCliente = async (
    idCliente: number,
    data: Partial<ICliente>
  ): Promise<ICliente | null> => {
    const clienteActual = await this.encontrarClientePorId(idCliente);

    if (!clienteActual) return null;

    await ejecutarSP("SetEstadoCliente", {
      idCliente: idCliente,
      estado: data.estado_idestado,
    });

    return (await this.encontrarClientePorId(idCliente)) as ICliente;
  };
}
