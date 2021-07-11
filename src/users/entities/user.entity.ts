import { Column, Model, Table, AutoIncrement, Unique, PrimaryKey, AllowNull } from "sequelize-typescript";

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number

  @Column
  name: string;

  @Unique(true) // todo: какие параметры???
  @Column
  email: string;

  @Unique(true) // todo: какие параметры???
  @Column
  phone: string;

  @Column
  passwordHash: string;
}
