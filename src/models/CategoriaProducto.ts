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
import { Estado } from "./Estado";
import { Producto } from "./Producto";

@Table({ tableName: "CategoriaProductos", timestamps: false })
export class CategoriaProducto extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  idCategoriaProductos!: number;

  @AllowNull(false)
  @Column
  nombre!: string;

  @Column
  fecha_creacion!: Date;

  @Column
  fecha_actualizacion!: Date;

  @ForeignKey(() => Estado)
  @Column
  estado_idestado!: number;

  @BelongsTo(() => Estado)
  estado!: Estado;

  @HasMany(() => Producto)
  productos!: Producto[];
}
