export interface ICliente {
  idClientes: number;
  razon_social: string;
  nombre_comercial?: string;
  direccion_entrega?: string;
  telefono?: string;
  email?: string;
  estado_idestado?: number;
}