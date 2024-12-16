import { ejecutarSP } from "../utils/dbUtils";
import { IUsuario } from "../interfaces/IUsuario";
import { hashPassword } from "../utils/hash";
import { Usuario } from "../models/Usuario";

class UsuarioService {
  async listarTodosUsuarios(): Promise<IUsuario[]> {
    const usuarios = await Usuario.findAll({
      include: ["estado", "rol", "cliente"],
    });
    return usuarios as IUsuario[];
  }

  async encontrarPorId(id: number): Promise<IUsuario | null> {
    const usuario = await Usuario.findByPk(id, {
      include: ["estado", "rol", "cliente"],
    });

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

    await ejecutarSP("UpdateUsuario", {
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

    await ejecutarSP("SetEstadoUsuario", {
      idUsuario: id,
      estado: data.estado_idestado,
    });

    return (await this.encontrarPorId(id)) as IUsuario;
  }
}

export default new UsuarioService();
