import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
} from "sequelize-typescript";
import { Estado } from "./Estado";

@Table
export class Cliente extends Model<Cliente> {
  @PrimaryKey
  @AutoIncrement
  @Column
  idClientes!: number;

  @Column
  razon_social!: string;

  @Column
  nombre_comercial!: string;

  @Column
  direccion_entrega!: string;

  @Column
  telefono!: string;

  @Column
  email!: string;

  @ForeignKey(() => Estado)
  @Column
  estado_idestado!: number;
}
