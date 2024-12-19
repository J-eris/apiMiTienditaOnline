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
import { Carrito } from "./Carrito";
import { Producto } from "./Producto";

@Table({ tableName: "CarritoDetalles", timestamps: false })
export class CarritoDetalles extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  idCarritoDetalles!: number;

  @ForeignKey(() => Carrito)
  @Column
  idCarrito!: number;

  @BelongsTo(() => Carrito)
  carrito!: Carrito;

  @ForeignKey(() => Producto)
  @Column
  idProducto!: number;

  @BelongsTo(() => Producto)
  producto!: Producto;

  @AllowNull(false)
  @Column
  cantidad!: number;

  @AllowNull(false)
  @Column
  precio!: number;

  @AllowNull(false)
  @Column
  subtotal!: number;
}
