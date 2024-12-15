import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

@Table
export class Rol extends Model<Rol> {
  @PrimaryKey
  @AutoIncrement
  @Column
  idrol!: number;

  @Column
  nombre!: string;
}
