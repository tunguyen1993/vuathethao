import {
  BeforeCreate,
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
import { Exclude } from "class-transformer";
import * as bcrypt from "bcrypt";
import { NotifyEntity } from "../notify/notify.entity";

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

  @Column({ allowNull: true })
  @Exclude()
  refresh_token?: string;

  @HasMany(() => CategoryEntity, {})
  categories: CategoryEntity[];

  @HasMany(() => PostEntity, {})
  posts: PostEntity[];

  @HasMany(() => PageEntity, {})
  pages: PageEntity[];

  @HasMany(() => PageEntity, {})
  notify: NotifyEntity[];

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

  @BeforeCreate
  static async setPassword(instance: UserEntity) {
    if (instance.password) {
      instance.password = await bcrypt.hash(
        instance.password + process.env.PASS_SALT,
        10,
      );
      return instance;
    }
  }
}
