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
import { PageItemModule } from "./modules/page-item/page-item.module";
import { UploadFileModule } from "./modules/upload-file/upload-file.module";
import { Sequelize } from "sequelize-typescript";
import { JwtStrategy } from "./modules/auth/jwt.strategy";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { HttpInterceptor } from "./core/Interceptors/http.interceptor";
import { LoggingInterceptor } from "@algoan/nestjs-logging-interceptor";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { MulterModule } from "@nestjs/platform-express";
import { NotifyModule } from "./modules/notify/notify.module";
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
    PageItemModule,
    UploadFileModule,
    NotifyModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "assets"),
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: "./assets/videos",
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}