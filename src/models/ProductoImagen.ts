import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Producto } from "./Producto";

@Table({ tableName: "ProductoImagenes", timestamps: false })
export class ProductoImagen extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  idImagen!: number;

  @ForeignKey(() => Producto)
  @AllowNull(false)
  @Column
  idProducto!: number;

  @BelongsTo(() => Producto)
  producto!: Producto;

  @AllowNull(false)
  @Column
  ruta_imagen!: string;

  @Column
  descripcion!: string;

  @Column
  fecha_creacion!: Date;

  @Column
  fecha_actualizacion!: Date;
}
