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

@Table({
  timestamps: true,
  tableName: "categories",
  deletedAt: true,
})
export class CategoryEntity extends Model<CategoryEntity> {
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

  @HasMany(() => CategoryItemEntity, {
    onDelete: "CASCADE",
    hooks: true,
  })
  items: CategoryItemEntity[];

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

  @HasOne(() => PageTypeEntity)
  page: PageTypeEntity;
}
