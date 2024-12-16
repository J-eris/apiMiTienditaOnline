import { IUsuario } from "./IUsuario";

export interface IUsuarioResponse extends Omit<IUsuario, "password"> {}
