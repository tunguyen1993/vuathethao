import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Sequelize,
  Table,
} from "sequelize-typescript";
import { PageItemEntity } from "../page-item/page-item.entity";
import { PageTypeEntity } from "../page-type/page-type.entity";
import { UserEntity } from "../user/user.entity";
import { PageTypeFakeEntity } from "../page-type/page-type-fake.entity";
import { PageItemFakeEntity } from "../page-item/page-item-fake.entity";

@Table({
  timestamps: true,
  tableName: "pageFake",
})
export class PageFakeEntity extends Model<PageFakeEntity> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING(255),
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM("FRONT_PAGE", "DEFAULT"),
    defaultValue: "DEFAULT",
  })
  page_type: string;

  @ForeignKey(() => UserEntity)
  @Column
  user_id: number;

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

  @HasMany(() => PageTypeFakeEntity, {
    onDelete: "CASCADE",
    hooks: true,
  })
  pageTypes: PageTypeFakeEntity[];

  @HasMany(() => PageItemFakeEntity, {
    onDelete: "CASCADE",
    hooks: true,
  })
  pageItems: PageItemFakeEntity[];

  @BelongsTo(() => UserEntity)
  user_created: UserEntity;
}
