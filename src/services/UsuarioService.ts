import sequelize from "../config/database";
import { IUsuario } from "../interfaces/IUsuario";
import { comparePassword, hashPassword } from "../utils/hash";
import { QueryTypes } from "sequelize";
import { Usuario } from "../models/Usuario";
import { generateToken } from "../utils/jwt";
import { ILoginResponse } from "../interfaces/ILogin";

class UsuarioService {
  private async ejecutarSP(
    spName: string,
    params: { [key: string]: any }
  ): Promise<any> {
    const formattedParams = Object.entries(params)
      .map(([key, value]) =>
        value !== null && value !== undefined
          ? `@${key}='${value}'`
          : `@${key}=NULL`
      )
      .join(", ");
    const query = `EXEC ${spName} ${formattedParams}`;
    return await sequelize.query(query, { type: QueryTypes.RAW });
  }

  async registrarNuevoUsuario(
    data: Omit<
      IUsuario,
      "idusuarios" | "fecha_creacion" | "fecha_actualizacion"
    >
  ): Promise<IUsuario | null> {
    const usuarioExistente = await this.encontrarPorCorreo(
      data.correo_electronico
    );
    if (usuarioExistente) throw new Error("Usuario ya existe.");

    const hashedPassword = await hashPassword(data.password);
    const result = await this.ejecutarSP("InsertUsuario", {
      correo_electronico: data.correo_electronico,
      password: hashedPassword,
      nombre_completo: data.nombre_completo || null,
      telefono: data.telefono || null,
      fecha_nacimiento: data.fecha_nacimiento || null,
      estado_idestado: data.estado_idestado || null,
      rol_idrol: data.rol_idrol || null,
      Clientes_idClientes: data.Clientes_idClientes || null,
    });

    if (!result[0][0].idusuarios)
      throw new Error("No se pudo registrar el usuario.");

    return (await this.encontrarPorId(result[0][0].idusuarios)) as IUsuario;
  }

  async loginUsuario(
    email: string,
    password: string
  ): Promise<ILoginResponse | null> {
    const result = await Usuario.findOne({
      where: { correo_electronico: email },
    });

    if (!result) throw new Error("Credenciales inválidas.");

    const passwordIsCorrect = await comparePassword(password, result.password);

    if (!passwordIsCorrect) return null;

    const token = generateToken({ id: result.idusuarios });
    const { password: _, ...usuarioSinPassword } = result.toJSON();
    const data = {
      token,
      usuario: usuarioSinPassword as IUsuario,
    };

    return data as ILoginResponse;
  }

  async listarTodosUsuarios(): Promise<IUsuario[]> {
    const usuarios = await Usuario.findAll();
    return usuarios as IUsuario[];
  }

  async encontrarPorId(id: number): Promise<IUsuario | null> {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return null;
    }

    return usuario as IUsuario;
  }

  async encontrarPorCorreo(correo: string): Promise<IUsuario | null> {
    const result = await Usuario.findOne({
      where: { correo_electronico: correo },
    });

    if (!result) {
      return null;
    }

    return result as IUsuario;
  }

  async actualizarUsuario(
    id: number,
    data: Partial<IUsuario>
  ): Promise<IUsuario> {
    const usuarioActual = await this.encontrarPorId(id);

    if (!usuarioActual) {
      throw new Error("Usuario no encontrado.");
    }

    data.password = data.password
      ? await hashPassword(data.password)
      : usuarioActual.password;

    await this.ejecutarSP("UpdateUsuario", {
      idusuarios: id || usuarioActual.idusuarios,
      correo_electronico:
        data.correo_electronico || usuarioActual.correo_electronico,
      password: data.password,
      nombre_completo: data.nombre_completo || usuarioActual.nombre_completo,
      telefono: data.telefono || usuarioActual.telefono,
      fecha_nacimiento: data.fecha_nacimiento || usuarioActual.fecha_nacimiento,
      estado_idestado: data.estado_idestado || usuarioActual.estado_idestado,
      rol_idrol: data.rol_idrol || usuarioActual.rol_idrol,
      Clientes_idClientes:
        data.Clientes_idClientes || usuarioActual.Clientes_idClientes,
    });

    return (await this.encontrarPorId(id)) as IUsuario;
  }

  async cambiarEstadoUsuario(
    id: number,
    data: Partial<IUsuario>
  ): Promise<IUsuario> {
    const usuarioActual = await this.encontrarPorId(id);

    if (!usuarioActual) {
      throw new Error("Usuario no encontrado.");
    }

    await this.ejecutarSP("SetEstadoUsuario", {
      idUsuario: id,
      estado: data.estado_idestado,
    });

    return (await this.encontrarPorId(id)) as IUsuario;
  }
}

export default new UsuarioService();
