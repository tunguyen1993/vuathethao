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
import { CategoryFakeEntity } from "../category/category-fake.entity";
import { PageFakeEntity } from "../page/page-fake.entity";
import { PageItemFakeEntity } from "../page-item/page-item-fake.entity";

@Table({
  timestamps: true,
  tableName: "pageTypeFake",
})
export class PageTypeFakeEntity extends Model<PageTypeFakeEntity> {
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

  @BelongsTo(() => CategoryFakeEntity)
  category!: CategoryFakeEntity;

  @AllowNull(true)
  @ForeignKey(() => CategoryFakeEntity)
  @Column
  category_id: number;

  @BelongsTo(() => PageFakeEntity)
  page: PageFakeEntity;

  @AllowNull(false)
  @ForeignKey(() => PageFakeEntity)
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

  @HasMany(() => PageItemFakeEntity, {
    onDelete: "CASCADE",
    hooks: true,
  })
  items: PageItemFakeEntity[];
}
