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
      config.logging = true;
      const sequelize = new Sequelize(config);
      sequelize.addModels([
        UserEntity,
        PostEntity,
        PageEntity,
        CategoryEntity,
        PageTypeEntity,
        PageItemEntity,
        CategoryItemEntity,
        ConfigEntity,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
