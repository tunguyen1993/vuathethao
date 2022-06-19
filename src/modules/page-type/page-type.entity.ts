import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
} from "sequelize-typescript";
import { PageEntity } from "../page/page.entity";
import { PageItemEntity } from "../page-item/page-item.entity";
import { UserEntity } from "../user/user.entity";
import { CategoryEntity } from "../category/category.entity";

@Table({
  timestamps: true,
  tableName: "page_types",
})
export class PageTypeEntity extends Model<PageTypeEntity> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING(255),
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  order: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  max_fields: number;

  @Column({
    allowNull: false,
    type: DataType.ENUM("POST", "CATEGORY", "ADS"),
    defaultValue: "POST",
  })
  type: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM("POST", "ADS", "GAME"),
    defaultValue: "POST",
  })
  FrontEndType: string;

  @BelongsTo(() => CategoryEntity)
  category!: CategoryEntity;

  @AllowNull(true)
  @ForeignKey(() => CategoryEntity)
  @Column
  category_id: number;

  @BelongsTo(() => PageEntity)
  page: PageEntity;

  @AllowNull(false)
  @ForeignKey(() => PageEntity)
  @Column
  page_id: number;

  @BelongsTo(() => UserEntity)
  user_created!: UserEntity;

  @AllowNull(false)
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

  @HasMany(() => PageItemEntity, {
    onDelete: "CASCADE",
    hooks: true,
  })
  items: PageItemEntity[];
}
