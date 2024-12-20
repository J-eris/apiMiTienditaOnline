import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../utils/jwt";

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
