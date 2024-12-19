import { Request, Response } from "express";
import { ClienteService } from "../services/ClienteService";
import { sendError, sendSuccess } from "../utils/asyncHandler";

const clienteService = new ClienteService();

export class ClienteController {
  listarClientes = async (req: Request, res: Response) => {
    try {
      const clientes = await clienteService.listarTodosClientes();
      sendSuccess(res, clientes);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  async buscarPorId(req: Request, res: Response) {
    try {
      const cliente = await clienteService.encontrarPorId(
        parseInt(req.params.id)
      );

      if (!cliente)
        return sendError(
          res,
          `Cliente con id ${req.params.id} no encontrado.`,
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
        params: { id },
      } = req;

      if (!body.razon_social)
        return sendError(res, "Razón social no especificada.", 400);

      const clienteActualizado = await clienteService.actualizarCliente(
        parseInt(id),
        body
      );

      if (!clienteActualizado)
        return sendError(
          res,
          `Cliente con id ${req.params.id} no encontrado.`,
          404
        );

      sendSuccess(res, clienteActualizado);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async cambiarEstadoCliente(req: Request, res: Response) {
    try {
      const cliente = await clienteService.cambiarEstadoCliente(
        parseInt(req.params.id),
        req.body
      );

      if (!cliente)
        return sendError(
          res,
          `Cliente con id ${req.params.id} no encontrado.`,
          404
        );

      sendSuccess(res, cliente);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}
