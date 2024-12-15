export interface IUsuario {
  idusuarios: number;
  correo_electronico: string;
  password: string;
  nombre_completo?: string;
  telefono?: string;
  fecha_nacimiento?: Date;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
  estado_idestado?: number;
  rol_idrol?: number;
  Clientes_idClientes?: number;
}
