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
import { CategoryItemEntity } from "../category-item/category-item.entity";
import { UserEntity } from "../user/user.entity";
import { PageTypeEntity } from "../page-type/page-type.entity";
import { CategoryItemFakeEntity } from "../category-item/category-item-fake.entity";
import { PageTypeFakeEntity } from "../page-type/page-type-fake.entity";

@Table({
  timestamps: true,
  tableName: "categoriesFake",
  deletedAt: true,
})
export class CategoryFakeEntity extends Model<CategoryFakeEntity> {
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
    unique: true,
  })
  name: string;

  @ForeignKey(() => UserEntity)
  @Column
  user_id: number;

  @HasMany(() => CategoryItemFakeEntity, {
    onDelete: "CASCADE",
    hooks: true,
  })
  items: CategoryItemFakeEntity[];

  @BelongsTo(() => UserEntity)
  user_created: UserEntity;

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

  @HasOne(() => PageTypeFakeEntity)
  page: PageTypeFakeEntity;
}
