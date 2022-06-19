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
import { PostEntity } from "../post/post.entity";
import { UserEntity } from "../user/user.entity";

@Table({
  timestamps: true,
  tableName: "notifications",
})
export class NotifyEntity extends Model<NotifyEntity> {
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
  title: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  content: string;

  @ForeignKey(() => PostEntity)
  @Column
  post_id: number;

  @BelongsTo(() => PostEntity)
  post: PostEntity;

  @ForeignKey(() => UserEntity)
  @Column
  user_id: number;

  @BelongsTo(() => UserEntity)
  user_created: UserEntity;

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  read: boolean;

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
