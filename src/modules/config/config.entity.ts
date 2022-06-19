import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Sequelize,
  Table,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "config",
})
export class ConfigEntity extends Model<ConfigEntity> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  type: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  link: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  content: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn("now"),
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn("now"),
  })
  updatedAt: Date;
}
