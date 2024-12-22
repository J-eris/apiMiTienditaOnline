import { Request, Response } from "express";
import { ClienteService } from "../services/ClienteService";
import { sendError, sendSuccess } from "../utils/asyncHandler";

const clienteService = new ClienteService();

class ClienteController {
  listarClientes = async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const clientes = await clienteService.listarTodosClientes(
        Number(page),
        Number(limit)
      );
      sendSuccess(res, clientes);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  async buscarClientePorId(req: Request, res: Response) {
    try {
      const cliente = await clienteService.encontrarClientePorId(
        parseInt(req.params.idCliente)
      );

      if (!cliente)
        return sendError(
          res,
          `Cliente con id ${req.params.idCliente} no encontrado.`,
          404
        );

      sendSuccess(res, cliente);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async crearCliente(req: Request, res: Response) {
    try {
      const { body } = req;

      if (!body.razon_social)
        return sendError(res, "Razón social no especificada.", 400);

      const nuevoCliente = await clienteService.crearNuevoCliente(body);

      if (!nuevoCliente) return sendError(res, `Cliente ya existe.`, 400);

      sendSuccess(res, nuevoCliente, 201);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async actualizarCliente(req: Request, res: Response) {
    try {
      const {
        body,
        params: { idCliente },
      } = req;

      if (!body.razon_social)
        return sendError(
          res,
          "Datos incompletos para actualizar el cliente.",
          400
        );

      const clienteActualizado = await clienteService.actualizarCliente(
        parseInt(idCliente),
        body
      );

      if (!clienteActualizado)
        return sendError(
          res,
          `Cliente con id ${req.params.idCliente} no encontrado.`,
          404
        );

      sendSuccess(res, clienteActualizado);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async cambiarEstadoCliente(req: Request, res: Response) {
    try {
      const {
        body,
        params: { idCliente },
      } = req;

      if (!body.estado_idestado)
        return sendError(res, "Estado no especificado.");

      const cliente = await clienteService.cambiarEstadoCliente(
        parseInt(idCliente),
        body
      );

      if (!cliente)
        return sendError(
          res,
          `Cliente con id ${req.params.idCliente} no encontrado.`,
          404
        );

      sendSuccess(res, cliente);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}

export default new ClienteController();
