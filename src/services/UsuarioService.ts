import { ejecutarSP } from "../utils/dbUtils";
import { IUsuario, IUsuarioPaginado } from "../interfaces/IUsuario";
import { hashPassword } from "../utils/hash";
import { Usuario } from "../models/Usuario";
import { IOrden } from "../interfaces/IOrden";
import { ICarrito } from "../interfaces/ICarrito";

class UsuarioService {
  listarTodosUsuarios = async (
    page: number,
    limit: number
  ): Promise<IUsuarioPaginado> => {
    const offset = (page - 1) * limit;
    const totalItems = await Usuario.count();

    const usuarios = await Usuario.findAll({
      attributes: { exclude: ["password"] },
      include: ["estado", "rol", "cliente"],
      limit,
      offset,
    });
    return {
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      currentPage: page,
      usuarios: usuarios as IUsuario[],
    };
  };

  encontrarUsuarioPorId = async (
    idUsuario: number
  ): Promise<IUsuario | null> => {
    const usuario = await Usuario.findByPk(idUsuario, {
      attributes: { exclude: ["password"] },
      include: ["estado", "rol", "cliente"],
    });

    if (!usuario) return null;

    return usuario as IUsuario;
  };

  encontrarUsuarioPorCorreo = async (
    correo: string
  ): Promise<IUsuario | null> => {
    const result = await Usuario.findOne({
      include: ["estado", "rol", "cliente"],
      where: { correo_electronico: correo },
    });

    if (!result) return null;

    return result as IUsuario;
  };

  actualizarUsuario = async (
    idUsuario: number,
    data: Partial<IUsuario>
  ): Promise<IUsuario | null> => {
    const usuarioActual = await this.encontrarUsuarioPorId(idUsuario);

    if (!usuarioActual) return null;

    data.password = data.password
      ? await hashPassword(data.password)
      : usuarioActual.password;

    await ejecutarSP("UpdateUsuario", {
      idusuarios: idUsuario || usuarioActual.idusuarios,
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

    return (await this.encontrarUsuarioPorId(idUsuario)) as IUsuario;
  };

  obtenerOrdenesPorUsuario = async (
    idUsuario: number
  ): Promise<IOrden[] | null> => {
    const ordenes = await ejecutarSP("GetOrdenesPorUsuario", { idUsuario });

    if (!ordenes) return null;

    return ordenes[0] as IOrden[];
  };

  obtenerCarritoUsuario = async (
    idUsuario: number
  ): Promise<ICarrito[] | null> => {
    const carrito = await ejecutarSP("GetCarritoPorUsuario", { idUsuario });

    if (!carrito) return null;

    return carrito[0] as ICarrito[];
  };

  cambiarEstadoUsuario = async (
    idUsuario: number,
    data: Partial<IUsuario>
  ): Promise<IUsuario | null> => {
    const usuarioActual = await this.encontrarUsuarioPorId(idUsuario);

    if (!usuarioActual) return null;

    await ejecutarSP("SetEstadoUsuario", {
      idUsuario: idUsuario,
      estado: data.estado_idestado,
    });

    return (await this.encontrarUsuarioPorId(idUsuario)) as IUsuario;
  };
}

export default new UsuarioService();
