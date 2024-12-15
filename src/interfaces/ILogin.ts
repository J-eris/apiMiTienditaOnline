import { IUsuario } from "./IUsuario";

export interface ILoginResponse {
  token: string;
  usuario: IUsuario;
}
