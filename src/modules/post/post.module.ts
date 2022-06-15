import { Module } from "@nestjs/common";
import { PostProviders } from "./post.provider";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";

@Module({
  providers: [...PostProviders, PostService],
  controllers: [PostController],
})
export class PostModule {}
