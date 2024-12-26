import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../utils/jwt";
import UsuarioService from "../services/UsuarioService";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const jwtByUser = req.headers.authorization || "";
  const token = jwtByUser.split(" ").pop();
  if (!token) {
    res.status(401).send("Acceso denegado. Token no proporcionado.");
    return;
  }

  try {
    const decoded = verificarToken(token);
    (req as any).user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Token inválido.");
  }
};

export const authorize = (roles: string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const user = (req as any).user;
    if (!user) {
      res.status(401).send("Acceso denegado. Usuario no autenticado.");
      return;
    }

    try {
      const usuario = await UsuarioService.encontrarUsuarioPorId(user.id);
      if (!usuario) {
        res.status(401).send("Acceso denegado. Usuario no encontrado.");
        return;
      }

      const rolesUsuario = roles.includes(usuario.rol!.nombre.toLowerCase());
      if (!rolesUsuario) {
        res.status(403).send("Acceso denegado. Rol no autorizado.");
        return;
      }
      next();
    } catch (error) {
      res.status(500).send("Error interno del servidor.");
    }
  };
};
