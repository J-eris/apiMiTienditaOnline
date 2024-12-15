import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

@Table
export class Estado extends Model<Estado> {
  @PrimaryKey
  @AutoIncrement
  @Column
  idestado!: number;

  @Column
  nombre!: string;
}
