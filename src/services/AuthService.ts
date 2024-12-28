import { IUsuario } from "../interfaces/IUsuario";
import { IUsuarioResponse } from "../interfaces/IUsuario";
import { Usuario } from "../models/Usuario";
import { compararPassword, hashPassword } from "../utils/hash";
import { generarToken } from "../utils/jwt";
import { ILoginResponse } from "../interfaces/ILogin";
import { ejecutarSP } from "../utils/dbUtils";
import UsuarioService from "./UsuarioService";

class AuthService {
  registrarNuevoUsuario = async (
    data: Omit<
      IUsuario,
      "idusuarios" | "fecha_creacion" | "fecha_actualizacion"
    >
  ): Promise<IUsuario | null> => {
    const usuarioExistente = await UsuarioService.encontrarUsuarioPorCorreo(
      data.correo_electronico
    );
    if (usuarioExistente) return null;

    const hashedPassword = await hashPassword(data.password);
    const result = await ejecutarSP("InsertUsuario", {
      correo_electronico: data.correo_electronico,
      password: hashedPassword,
      nombre_completo: data.nombre_completo || null,
      telefono: data.telefono || null,
      fecha_nacimiento: data.fecha_nacimiento || null,
      estado_idestado: data.estado_idestado || null,
      rol_idrol: data.rol_idrol || null,
      Clientes_idClientes: data.Clientes_idClientes || null,
    });

    if (!result) throw new Error("No se pudo registrar el usuario.");

    return result[0][0] as IUsuario;
  };

  loginUsuario = async (
    email: string,
    password: string
  ): Promise<ILoginResponse | null> => {
    const usuario = await UsuarioService.encontrarUsuarioPorCorreo(email);

    if (!usuario) return null;

    const passwordIsCorrect = await compararPassword(
      password,
      usuario.password
    );

    if (!passwordIsCorrect) return null;

    const token = generarToken({ id: usuario.idusuarios });
    const data = {
      token,
      usuario: usuario as IUsuarioResponse,
    };

    return data as ILoginResponse;
  };
}

export default new AuthService();
