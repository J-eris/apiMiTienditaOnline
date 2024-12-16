import { Request, Response } from "express";
import { RolService } from "../services/RolService";
import { sendError, sendSuccess } from "../utils/asyncHandler";

const rolService = new RolService();

export class RolController {
  async listarRoles(req: Request, res: Response) {
    try {
      const roles = await rolService.listarTodosRoles();
      sendSuccess(res, roles);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const rol = await rolService.encontrarPorId(parseInt(req.params.id));

      if (!rol)
        return sendError(
          res,
          `Rol con id ${req.params.id} no encontrado.`,
          404
        );

      sendSuccess(res, rol);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async crearRol(req: Request, res: Response) {
    try {
      const rol = await rolService.crearNuevoRol(req.body);

      if (!rol) return sendError(res, `Rol ya existe.`, 400);

      sendSuccess(res, rol, 201);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async actualizarRol(req: Request, res: Response) {
    try {
      const rolActualizado = await rolService.actualizarRol(
        parseInt(req.params.id),
        req.body
      );

      if (!rolActualizado)
        return sendError(
          res,
          `Rol con id ${req.params.id} no encontrado.`,
          404
        );

      sendSuccess(res, rolActualizado);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}
