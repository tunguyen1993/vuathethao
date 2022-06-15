import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./core/database/database.module";
import { ConfigModule } from "@nestjs/config";
import { CategoryModule } from "./modules/category/category.module";
import { PageModule } from "./modules/page/page.module";
import { UserModule } from "./modules/user/user.module";
import { PostModule } from "./modules/post/post.module";
import { PageTypeModule } from "./modules/page-type/page-type.module";
import { ConfigModule as configAppModule } from "./modules/config/config.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CategoryItemModule } from "./modules/category-item/category-item.module";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DatabaseModule,
    UserModule,
    PageModule,
    CategoryModule,
    PostModule,
    PageTypeModule,
    configAppModule,
    CategoryItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
