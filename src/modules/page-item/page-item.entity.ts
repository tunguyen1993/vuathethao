import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Sequelize,
  Table,
} from "sequelize-typescript";
import { PageEntity } from "../page/page.entity";
import { PageTypeEntity } from "../page-type/page-type.entity";
import { PostEntity } from "../post/post.entity";

@Table({
  timestamps: true,
  tableName: "page_items",
})
export class PageItemEntity extends Model<PageItemEntity> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @AllowNull(false)
  @ForeignKey(() => PageTypeEntity)
  @Column
  page_type_id: number;

  @AllowNull(false)
  @ForeignKey(() => PageEntity)
  @Column
  page_id: number;

  @AllowNull(false)
  @ForeignKey(() => PostEntity)
  @Column
  post_id: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  order: number;

  @BelongsTo(() => PostEntity)
  post: PostEntity;

  @BelongsTo(() => PageEntity)
  pages!: PageEntity;

  @BelongsTo(() => PageTypeEntity)
  pageType!: PageTypeEntity;

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
