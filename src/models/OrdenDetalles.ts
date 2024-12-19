import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Orden } from "./Orden";
import { Producto } from "./Producto";

@Table({ tableName: "OrdenDetalles", timestamps: false })
export class OrdenDetalles extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  idOrdenDetalles!: number;

  @ForeignKey(() => Orden)
  @Column
  Orden_idOrden!: number;

  @BelongsTo(() => Orden)
  orden!: Orden;

  @ForeignKey(() => Producto)
  @Column
  Productos_idProductos!: number;

  @BelongsTo(() => Producto)
  producto!: Producto;

  @Column
  cantidad!: number;

  @Column
  precio!: number;

  @Column
  subtotal!: number;
}
