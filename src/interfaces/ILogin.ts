import { IUsuarioResponse } from "./IUsuarioResponse";

export interface ILoginResponse {
  token: string;
  usuario: IUsuarioResponse;
}
