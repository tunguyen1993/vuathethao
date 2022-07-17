import {
  CacheModule,
  CACHE_MANAGER,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  CacheInterceptor,
} from "@nestjs/common";
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
import { JwtStrategy } from "./modules/auth/jwt.strategy";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { HttpInterceptor } from "./core/Interceptors/http.interceptor";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { NotifyModule } from "./modules/notify/notify.module";
import { FrontendMiddleware } from "./core/middleware/frontend.middleware";
import { FirebaseService } from "./core/firebase/firebase.service";
import * as redisStore from "cache-manager-redis-store";
import type { ClientOpts } from "redis";
import { LoggingInterceptor } from "@algoan/nestjs-logging-interceptor";

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
    ServeStaticModule.forRoot(
      {
        serveRoot: "/files",
        rootPath: join(__dirname, "..", "assets"),
      },
      {
        serveRoot: "",
        rootPath: join(__dirname, "..", "frontend"),
      },
    ),
    CacheModule.register<ClientOpts>({
      store: redisStore,
      host: "localhost",
      port: 6379,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    FirebaseService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(@Inject(CACHE_MANAGER) private cacheManager) {
    cacheManager.get("FAKE_DATA").then((res) => {
      if (!res) {
        cacheManager
          .set("FAKE_DATA", true, { ttl: 0 })
          .then((res) => console.log(res));
      }
    });
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FrontendMiddleware).forRoutes({
      path: "/**",
      method: RequestMethod.ALL,
    });
  }
}
