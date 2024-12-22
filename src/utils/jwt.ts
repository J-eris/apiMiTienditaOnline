import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto.01";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH || "tu_secreto.02";

const generarToken = (payload: object): string => {
  return sign(payload, JWT_SECRET, { expiresIn: "24h" });
};

const generarNuevoToken = (payload: object): string => {
  return sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

const verificarToken = (token: string): any => {
  return verify(token, JWT_SECRET);
};

const verificarNuevoToken = (token: string): any => {
  return verify(token, JWT_REFRESH_SECRET);
};

export { generarToken, generarNuevoToken, verificarToken, verificarNuevoToken };
