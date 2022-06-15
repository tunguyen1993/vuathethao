import {
  Column,
  DataType,
  HasMany,
  Model,
  Sequelize,
  Table,
} from "sequelize-typescript";
import { CategoryEntity } from "../category/category.entity";
import { PostEntity } from "../post/post.entity";
import { PageEntity } from "../page/page.entity";

@Table({
  timestamps: true,
  tableName: "users",
})
export class UserEntity extends Model<UserEntity> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  full_name: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  email: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  password: string;

  @HasMany(() => CategoryEntity, {})
  categories: CategoryEntity[];
  //
  @HasMany(() => PostEntity, {})
  posts: PostEntity[];
  //
  @HasMany(() => PageEntity, {})
  pages: PageEntity[];

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
