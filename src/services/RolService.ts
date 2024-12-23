import { Rol } from "../models/Rol";
import { IRol, IRolPaginado } from "../interfaces/IRol";
import { ejecutarSP } from "../utils/dbUtils";

export class RolService {
  async listarTodosRoles(page: number, limit: number): Promise<IRolPaginado> {
    const offset = (page - 1) * limit;
    const totalItems = await Rol.count();

    const roles = await Rol.findAll({
      limit,
      offset,
    });

    return {
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      currentPage: page,
      roles: roles as IRol[],
    };
  }

  encontrarRolPorId = async (idRol: number): Promise<IRol | null> => {
    const rol = await Rol.findByPk(idRol);

    if (!rol) return null;
    return rol as IRol;
  };

  encontrarRolPorNombre = async (nombre: string): Promise<IRol | null> => {
    return await Rol.findOne({ where: { nombre } });
  };

  crearNuevoRol = async (data: Omit<IRol, "idrol">): Promise<IRol | null> => {
    const rolExistente = await this.encontrarRolPorNombre(data.nombre);
    if (rolExistente) return null;

    const rol = await ejecutarSP("InsertRol", {
      nombre: data.nombre,
    });

    if (!rol) throw new Error("No se pudo crear el rol.");

    return rol[0][0] as IRol;
  };

  actualizarRol = async (
    idRol: number,
    data: Partial<IRol>
  ): Promise<IRol | null> => {
    const rolActual = await this.encontrarRolPorId(idRol);

    if (!rolActual) return null;

    await ejecutarSP("UpdateRol", {
      idrol: idRol,
      nombre: data.nombre || rolActual.nombre,
    });

    return (await this.encontrarRolPorId(idRol)) as IRol;
  };
}
