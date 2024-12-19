import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Usuario } from "./Usuario";
import { Estado } from "./Estado";
import { OrdenDetalles } from "./OrdenDetalles";

@Table({ tableName: "Orden", timestamps: false })
export class Orden extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  idOrden!: number;

  @ForeignKey(() => Usuario)
  @Column
  usuarios_idusuarios!: number;

  @BelongsTo(() => Usuario)
  usuario!: Usuario;

  @ForeignKey(() => Estado)
  @Column
  estados_idestado!: number;

  @BelongsTo(() => Estado)
  estado!: Estado;

  @Column
  fecha_creacion!: Date;

  @Column
  fecha_actualizacion!: Date;

  @Column
  nombre_completo!: string;

  @Column
  direccion!: string;

  @Column
  telefono!: string;

  @Column
  correo_electronico!: string;

  @Column
  fecha_entrega!: Date;

  @Column
  total_orden!: number;

  @HasMany(() => OrdenDetalles)
  detallesOrden!: OrdenDetalles[];
}
