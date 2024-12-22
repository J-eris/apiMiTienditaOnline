export interface IEstado {
  idestado: number;
  nombre: string;
}

export interface IEstadoPaginado {
  estados: IEstado[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}
