import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Sequelize,
  Table,
} from "sequelize-typescript";
import { CategoryEntity } from "../category/category.entity";
import { PostEntity } from "../post/post.entity";

@Table({
  timestamps: true,
  tableName: "category_items",
})
export class CategoryItemEntity extends Model<CategoryItemEntity> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => CategoryEntity)
  @Column
  category_id: number;

  @ForeignKey(() => PostEntity)
  @Column
  post_id: number;

  @BelongsTo(() => CategoryEntity)
  category: CategoryEntity;

  @BelongsTo(() => PostEntity)
  post: PostEntity;

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
