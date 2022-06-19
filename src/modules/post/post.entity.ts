import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Sequelize,
  Table,
} from "sequelize-typescript";
import { PageItemEntity } from "../page-item/page-item.entity";
import { CategoryItemEntity } from "../category-item/category-item.entity";
import { UserEntity } from "../user/user.entity";

@Table({
  timestamps: true,
  tableName: "posts",
})
export class PostEntity extends Model<PostEntity> {
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
    type: DataType.STRING(500),
  })
  link: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
  })
  get image(): string {
    function ValidURL(str) {
      const regex =
        /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      return regex.test(str);
    }
    if (this.getDataValue("image") && ValidURL(this.getDataValue("image"))) {
      return this.getDataValue("image");
    }
    return process.env.BASE_URL + "/images/" + this.getDataValue("image");
  }

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
  })
  video: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  content: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(
      "DEFAULT",
      "VIDEO",
      "CARD",
      "GAME_MOBILE",
      "SUBSCRIBE",
      "ADS",
      "AGENCY",
    ),
    defaultValue: "DEFAULT",
  })
  type: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  promotion: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  view: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  pricing: number;

  @ForeignKey(() => UserEntity)
  @Column
  user_id: number;

  @HasOne(() => PageItemEntity, {
    onDelete: "CASCADE",
    hooks: true,
  })
  pageItem: PageItemEntity;
  //
  @HasOne(() => CategoryItemEntity, {
    onDelete: "CASCADE",
    hooks: true,
  })
  categoryItem: CategoryItemEntity;

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
}
