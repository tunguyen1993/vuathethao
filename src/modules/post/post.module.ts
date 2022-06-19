import { Module } from "@nestjs/common";
import { PostProviders } from "./post.provider";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { AdminPostController } from "./admin.post.controller";
import { Sequelize } from "sequelize-typescript";

@Module({
  providers: [...PostProviders, PostService],
  controllers: [PostController, AdminPostController],
  imports: [],
})
export class PostModule {}
