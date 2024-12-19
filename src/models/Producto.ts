import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { CategoriaProducto } from "./CategoriaProducto";
import { Usuario } from "./Usuario";
import { Estado } from "./Estado";
import { ProductoImagen } from "./ProductoImagen";
import { OrdenDetalles } from "./OrdenDetalles";

@Table({ tableName: "Productos", timestamps: false })
export class Producto extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  idProductos!: number;

  @ForeignKey(() => CategoriaProducto)
  @Column
  CategoriaProductos_idCategoriaProductos!: number;

  @BelongsTo(() => CategoriaProducto)
  categoriaProducto!: CategoriaProducto;

  @ForeignKey(() => Usuario)
  @Column
  usuarios_idusuarios!: number;

  @BelongsTo(() => Usuario)
  usuario!: Usuario;

  @AllowNull(false)
  @Column
  nombre!: string;

  @Column
  marca!: string;

  @Unique
  @Column
  codigo!: string;

  @AllowNull(false)
  @Column
  stock!: number;

  @AllowNull(false)
  @Column
  precio!: number;

  @Column
  fecha_creacion!: Date;

  @Column
  fecha_actualizacion!: Date;

  @ForeignKey(() => Estado)
  @Column
  estado_idestado!: number;

  @BelongsTo(() => Estado)
  estado!: Estado;

  @HasMany(() => ProductoImagen)
  imagenes!: ProductoImagen[];

  @HasMany(() => OrdenDetalles)
  ordenDetalles!: OrdenDetalles[];
}
