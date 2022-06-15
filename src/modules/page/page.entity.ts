import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Sequelize,
  Table,
} from "sequelize-typescript";
import { PageItemEntity } from "../page-item/page-item.entity";
import { PageTypeEntity } from "../page-type/page-type.entity";
import { UserEntity } from "../user/user.entity";

@Table({
  timestamps: true,
  tableName: "page",
})
export class PageEntity extends Model<PageEntity> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING(255),
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM("FRONT_PAGE", "DEFAULT"),
    defaultValue: "DEFAULT",
  })
  page_type: string;

  @ForeignKey(() => UserEntity)
  @Column
  user_id: number;

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

  @HasMany(() => PageTypeEntity, {
    onDelete: "CASCADE",
    hooks: true,
  })
  pageTypes: PageTypeEntity[];

  @HasMany(() => PageItemEntity, {
    onDelete: "CASCADE",
    hooks: true,
  })
  pageItems: PageItemEntity[];

  @BelongsTo(() => UserEntity)
  user_created: UserEntity;
}
