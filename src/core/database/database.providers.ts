import { Sequelize } from "sequelize-typescript";
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from "../constants";
import { databaseConfig } from "./database.config";
import { PostEntity } from "../../modules/post/post.entity";
import { PageEntity } from "../../modules/page/page.entity";
import { CategoryEntity } from "../../modules/category/category.entity";
import { PageTypeEntity } from "../../modules/page-type/page-type.entity";
import { PageItemEntity } from "../../modules/page-item/page-item.entity";
import { CategoryItemEntity } from "../../modules/category-item/category-item.entity";
import { UserEntity } from "../../modules/user/user.entity";
import { ConfigEntity } from "../../modules/config/config.entity";
import { NotifyEntity } from "../../modules/notify/notify.entity";
import { PostFakeEntity } from "../../modules/post/post-fake.entity";
import { PageFakeEntity } from "../../modules/page/page-fake.entity";
import { CategoryFakeEntity } from "../../modules/category/category-fake.entity";
import { PageTypeFakeEntity } from "../../modules/page-type/page-type-fake.entity";
import { PageItemFakeEntity } from "../../modules/page-item/page-item-fake.entity";
import { CategoryItemFakeEntity } from "../../modules/category-item/category-item-fake.entity";

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      config.logging = false;
      const sequelize = new Sequelize(config);
      sequelize.addModels([
        UserEntity,
        NotifyEntity,
        PostEntity,
        PostFakeEntity,
        PageEntity,
        PageFakeEntity,
        CategoryEntity,
        CategoryFakeEntity,
        PageTypeEntity,
        PageTypeFakeEntity,
        PageItemEntity,
        PageItemFakeEntity,
        CategoryItemEntity,
        CategoryItemFakeEntity,
        ConfigEntity,
      ]);
      await sequelize.sync();

      return sequelize;
    },
  },
];
