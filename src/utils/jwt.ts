import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto.01";

const generateToken = (payload: object): string => {
  const jwtToken = sign(payload, JWT_SECRET, { expiresIn: "24h" });
  return jwtToken;
};

const verifyToken = (token: string): any => {
  return verify(token, JWT_SECRET);
};

export { generateToken, verifyToken };
