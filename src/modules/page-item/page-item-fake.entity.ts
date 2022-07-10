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
import { PostFakeEntity } from "../post/post-fake.entity";
import { PageFakeEntity } from "../page/page-fake.entity";
import { PageTypeFakeEntity } from "../page-type/page-type-fake.entity";

@Table({
  timestamps: true,
  tableName: "pageItemFake",
})
export class PageItemFakeEntity extends Model<PageItemFakeEntity> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @AllowNull(false)
  @ForeignKey(() => PageTypeFakeEntity)
  @Column
  page_type_id: number;

  @AllowNull(false)
  @ForeignKey(() => PageFakeEntity)
  @Column
  page_id: number;

  @AllowNull(false)
  @ForeignKey(() => PostFakeEntity)
  @Column
  post_id: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  order: number;

  @BelongsTo(() => PostFakeEntity)
  post: PostFakeEntity;

  @BelongsTo(() => PageFakeEntity)
  pages!: PageFakeEntity;

  @BelongsTo(() => PageTypeFakeEntity)
  pageType!: PageTypeFakeEntity;

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
