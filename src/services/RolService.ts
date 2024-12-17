import { Rol } from "../models/Rol";
import { IRol } from "../interfaces/IRol";
import { ejecutarSP } from "../utils/dbUtils";

export class RolService {
  async listarTodosRoles(): Promise<IRol[]> {
    return await Rol.findAll();
  }

  encontrarPorId = async (id: number): Promise<IRol | null> => {
    const rol = await Rol.findByPk(id);

    if (!rol) return null;
    return rol as IRol;
  };

  crearNuevoRol = async (data: Omit<IRol, "idrol">): Promise<IRol | null> => {
    const rolExistente = await Rol.findOne({ where: { nombre: data.nombre } });
    if (rolExistente) return null;

    const rol = await ejecutarSP("InsertRol", {
      nombre: data.nombre,
    });

    if (!rol[0][0].idrol) throw new Error("No se pudo crear el rol.");

    return (await Rol.findByPk(rol[0][0].idrol)) as IRol;
  };

  actualizarRol = async (
    id: number,
    data: Partial<IRol>
  ): Promise<IRol | null> => {
    const rolActual = await this.encontrarPorId(id);

    if (!rolActual) return null;

    await ejecutarSP("UpdateRol", {
      idrol: id,
      nombre: data.nombre || rolActual.nombre,
    });
    
    return (await this.encontrarPorId(id)) as IRol;
  };
}
