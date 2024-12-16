import { Rol } from "../models/Rol";
import { IRol } from "../interfaces/IRol";
import { ejecutarSP } from "../utils/dbUtils";

export class RolService {
  async listarTodosRoles(): Promise<IRol[]> {
    return await Rol.findAll();
  }

  async encontrarPorId(id: number): Promise<IRol | null> {
    const rol = await Rol.findByPk(id);

    if (!rol) return null;
    return rol as IRol;
  }

  async crearNuevoRol(data: Omit<IRol, "fecha_creacion">): Promise<IRol> {
    const rolExistente = await Rol.findOne({ where: { nombre: data.idrol } });
    if (rolExistente) throw new Error("Rol ya existe.");

    const rol = await ejecutarSP("InsertRol", {
      nombre: data.nombre,
    });

    if (!rol[0][0].idrol) throw new Error("No se pudo crear el rol.");

    return (await Rol.findByPk(rol[0][0].idrol)) as IRol;
  }

  async actualizarRol(id: number, data: Partial<IRol>): Promise<void> {
    const rolActual = await this.encontrarPorId(id);

    if (!rolActual) {
      throw new Error("Rol no encontrado.");
    }

    await ejecutarSP("UpdateRol", {
      idrol: id,
      nombre: data.nombre || rolActual.nombre,
    });
  }
}
