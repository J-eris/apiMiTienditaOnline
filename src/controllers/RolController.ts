import { Request, Response } from "express";
import { RolService } from "../services/RolService";
import { sendError, sendSuccess } from "../utils/asyncHandler";

const rolService = new RolService();

export class RolController {
  listarRoles = async (req: Request, res: Response) => {
    try {
      const roles = await rolService.listarTodosRoles();
      sendSuccess(res, roles);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  buscarRolPorId = async (req: Request, res: Response) => {
    try {
      const rol = await rolService.encontrarRolPorId(
        parseInt(req.params.idRol)
      );

      if (!rol)
        return sendError(
          res,
          `Rol con id ${req.params.idRol} no encontrado.`,
          404
        );

      sendSuccess(res, rol);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  crearRol = async (req: Request, res: Response) => {
    try {
      const { nombre } = req.body;

      if (!nombre) return sendError(res, "Nombre de rol no especificado.", 400);

      const nuevoRol = await rolService.crearNuevoRol(req.body);

      if (!nuevoRol) return sendError(res, "Rol ya existe.", 400);

      sendSuccess(res, nuevoRol, 201);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  actualizarRol = async (req: Request, res: Response) => {
    try {
      const {
        body,
        params: { idRol },
      } = req;

      if (!body.nombre)
        return sendError(res, "Nombre de rol no especificado.", 400);

      const rolActualizado = await rolService.actualizarRol(
        parseInt(idRol),
        body
      );

      if (!rolActualizado)
        return sendError(
          res,
          `Rol con id ${req.params.idRol} no encontrado.`,
          404
        );

      sendSuccess(res, rolActualizado);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };
}

export default new RolController();
