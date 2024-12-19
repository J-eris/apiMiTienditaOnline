import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Usuario } from "./Usuario";
import { Estado } from "./Estado";
import { CarritoDetalles } from "./CarritoDetalles";

@Table({ tableName: "Carrito", timestamps: false })
export class Carrito extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  idCarrito!: number;

  @ForeignKey(() => Usuario)
  @Column
  idUsuario!: number;

  @BelongsTo(() => Usuario)
  usuario!: Usuario;

  @AllowNull(false)
  @Column
  fecha_creacion!: Date;

  @AllowNull(false)
  @Column
  fecha_actualizacion!: Date;

  @ForeignKey(() => Estado)
  @Column
  estado_idestado!: number;

  @BelongsTo(() => Estado)
  estado!: Estado;

  @HasMany(() => CarritoDetalles)
  detallesCarrito!: CarritoDetalles[];
}
