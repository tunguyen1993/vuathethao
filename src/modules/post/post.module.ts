import { Module } from "@nestjs/common";
import { PostProviders } from "./post.provider";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { AdminPostController } from "./admin.post.controller";
import { Sequelize } from "sequelize-typescript";
import { HttpModule } from "@nestjs/axios";
import { FilterIpService } from "../../core/service/filterIp.service";

@Module({
  imports: [HttpModule],
  providers: [...PostProviders, PostService, FilterIpService],
  controllers: [PostController, AdminPostController],
})
export class PostModule {}
