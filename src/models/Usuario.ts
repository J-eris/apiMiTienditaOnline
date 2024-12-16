import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Estado } from "./Estado";
import { Rol } from "./Rol";
import { Cliente } from "./Cliente";

@Table({ tableName: "usuarios", timestamps: false })
export class Usuario extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  idusuarios!: number;

  @Unique
  @AllowNull(false)
  @Column
  correo_electronico!: string;

  @AllowNull(false)
  @Column
  password!: string;

  @Column
  nombre_completo!: string;

  @Column
  telefono!: string;

  @Column
  fecha_nacimiento!: Date;

  @Column
  fecha_creacion!: Date;

  @Column
  fecha_actualizacion!: Date;

  @ForeignKey(() => Estado)
  @Column
  estado_idestado!: number;

  @BelongsTo(() => Estado)
  estado!: Estado;

  @ForeignKey(() => Rol)
  @Column
  rol_idrol!: number;

  @BelongsTo(() => Rol)
  rol!: Rol;

  @ForeignKey(() => Cliente)
  @Column
  Clientes_idClientes!: number;

  @BelongsTo(() => Cliente)
  cliente!: Cliente;

  toJSON() {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  }
}
