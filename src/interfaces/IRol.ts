export interface IRol {
  idrol: number;
  nombre: string;
}

export interface IRolPaginado {
  roles: IRol[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}
