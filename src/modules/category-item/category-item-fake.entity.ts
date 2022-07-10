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
import { CategoryFakeEntity } from "../category/category-fake.entity";
import { PostFakeEntity } from "../post/post-fake.entity";

@Table({
  timestamps: true,
  tableName: "categoryItemsFake",
})
export class CategoryItemFakeEntity extends Model<CategoryItemFakeEntity> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => CategoryFakeEntity)
  @Column
  category_id: number;

  @ForeignKey(() => PostFakeEntity)
  @Column
  post_id: number;

  @BelongsTo(() => CategoryFakeEntity)
  category: CategoryFakeEntity;

  @BelongsTo(() => PostFakeEntity)
  post: PostFakeEntity;

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
