import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
} from "sequelize-typescript";

@Table({ tableName: "estados", timestamps: false })
export class Estado extends Model<Estado> {
  @PrimaryKey
  @AutoIncrement
  @Column
  idestado!: number;

  @AllowNull(false)
  @Column
  nombre!: string;
}
