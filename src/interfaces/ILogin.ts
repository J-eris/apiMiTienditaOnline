import { IUsuarioResponse } from "./IUsuario";

export interface ILoginResponse {
  token: string;
  usuario: IUsuarioResponse;
}
