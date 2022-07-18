import {
  AfterCreate,
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
import { NotifyEntity } from "../notify/notify.entity";
import { FirebaseService } from "../../core/firebase/firebase.service";
import { PageItemFakeEntity } from "../page-item/page-item-fake.entity";
import { CategoryItemFakeEntity } from "../category-item/category-item-fake.entity";

@Table({
  timestamps: true,
  tableName: "postsFake",
})
export class PostFakeEntity extends Model<PostFakeEntity> {
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
    return process.env.BASE_URL + "/files/images/" + this.getDataValue("image");
  }

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
  })
  get video(): string | undefined {
    let video = this.getDataValue("video");
    if (!video) {
      return undefined;
    }
    function ValidURL(str) {
      const regex =
        /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      return regex.test(str);
    }
    if (this.getDataValue("video") && ValidURL(this.getDataValue("video"))) {
      return this.getDataValue("video");
    }
    return process.env.BASE_URL + "/files/videos/" + this.getDataValue("video");
  }

  @Column({
    allowNull: true,
    type: DataType.TEXT,
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
      "DEALS",
      "LIVESTREAM",
      "NOTIFY",
    ),
    defaultValue: "DEFAULT",
  })
  type: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM("ENABLE", "DISABLE"),
    defaultValue: "ENABLE",
  })
  status: string;

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
    allowNull: false,
    type: DataType.INTEGER,
  })
  order: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  pricing: number;

  @ForeignKey(() => UserEntity)
  @Column
  user_id: number;

  // @HasOne(() => NotifyEntity, {
  //   onDelete: "CASCADE",
  //   hooks: true,
  // })
  // notify: NotifyEntity;

  @HasOne(() => PageItemFakeEntity, {
    onDelete: "CASCADE",
    hooks: true,
  })
  pageItem: PageItemFakeEntity;
  //
  @HasOne(() => CategoryItemFakeEntity, {
    onDelete: "CASCADE",
    hooks: true,
  })
  categoryItem: CategoryItemFakeEntity;

  @BelongsTo(() => UserEntity)
  user_created: UserEntity;

  @Column({
    allowNull: true,
    type: DataType.VIRTUAL,
  })
  get video_type(): string | undefined {
    let video = this.getDataValue("video");
    if (!video) {
      return undefined;
    }
    if (video.search(/fb.watch/i) !== -1) {
      return "facebook";
    } else if (video.search(/facebook/i) !== -1) {
      return "facebook";
    } else if (video.search(/youtu/i) !== -1) {
      return "youtube";
    } else {
      return "upload";
    }
  }

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

  @AfterCreate
  static async pushNotify(instances, options) {
    let noti = new FirebaseService();
    if (instances.type === "NOTIFY") {
      noti.pushTopicNotify("notifyApp", {
        title: instances.title,
        body: JSON.stringify({
          id: instances.id,
          image: instances.image,
        }),
      });
    }
  }
}
