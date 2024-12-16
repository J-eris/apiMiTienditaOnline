import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
} from "sequelize-typescript";

@Table({ tableName: "rol", timestamps: false })
export class Rol extends Model<Rol> {
  @PrimaryKey
  @AutoIncrement
  @Column
  idrol!: number;

  @AllowNull(false)
  @Column
  nombre!: string;
}
