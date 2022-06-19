import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { JwtAuthGuard } from "../../core/guards/jwtAuth.guard";
import { Request, Response } from "express";

@UseGuards(JwtAuthGuard)
@Controller("api/v1/admin/post")
export class AdminPostController {
  constructor(private _postService: PostService) {}

  @Get()
  async getPosts(@Query("type") type: string) {
    return {
      code: 200,
      data: await this._postService.getListByType(type),
    };
  }

  @Get("lists")
  async getListPosts(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(query.page, query.limit),
    };
  }

  @Post("create-post")
  async createPost(@Body() body: any, @Req() request: Request) {
    return {
      code: 200,
      data: await this._postService.createPost({
        ...body,
        user_id: request.user["id"],
      }),
    };
  }

  @Post("create-video")
  async createVideo(@Body() body: any) {
    return {
      code: 200,
      data: await this._postService.createPost(body),
    };
  }

  @Post("create-game-card")
  async createGameCard(@Body() body: any) {
    return {
      code: 200,
      data: await this._postService.createPost(body),
    };
  }

  @Post("create-game-mobile")
  async createGameMobile(@Body() body: any) {
    return {
      code: 200,
      data: await this._postService.createPost(body),
    };
  }

  @Post("create-advertisement")
  async createAdvertisement(@Body() body: any) {
    return {
      code: 200,
      data: await this._postService.createPost(body),
    };
  }

  @Post("create-agency")
  async createAgency(@Body() body: any) {
    return {
      code: 200,
      data: await this._postService.createPost(body),
    };
  }

  @Post("create-deal")
  async createDeal(@Body() body: any) {
    return {
      code: 200,
      data: await this._postService.createPost(body),
    };
  }

  @Delete(":id")
  async deletePostId(@Param("id") id: number) {
    return {
      code: 200,
      data: await this._postService.deletePost(id),
    };
  }
}
