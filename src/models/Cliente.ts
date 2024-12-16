import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";
import { Estado } from "./Estado";

@Table({ tableName: "clientes", timestamps: false })
export class Cliente extends Model<Cliente> {
  @PrimaryKey
  @AutoIncrement
  @Column
  idClientes!: number;

  @AllowNull(false)
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

  @BelongsTo(() => Estado)
  estado!: Estado;
}
