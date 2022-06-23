import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { JwtAuthGuard } from "../../core/guards/jwtAuth.guard";
import { Request, Response } from "express";

@UseGuards(JwtAuthGuard)
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

  @Get("ads")
  async getListAdvertisements(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(query.page, query.limit, [15]),
    };
  }

  @Get("posts")
  async getListPosts(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(
        query.page,
        query.limit,
        [13, 1, 8, 4],
        query,
      ),
    };
  }

  @Get("deals")
  async getListDeals(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(query.page, query.limit, [3]),
    };
  }

  @Get("game-card")
  async getListGameCard(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(query.page, query.limit, [2]),
    };
  }

  @Get("game-mobile")
  async getGameMobile(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(query.page, query.limit, [6]),
    };
  }

  @Get("agency")
  async getAgency(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(query.page, query.limit, [5]),
    };
  }

  @Get("notify")
  async getNotify(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(query.page, query.limit, [14]),
    };
  }

  @Get("subscribe")
  async getSubscribe(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(query.page, query.limit, [7]),
    };
  }

  @Get("livestream")
  async livestream(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(query.page, query.limit, [9]),
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

  @Put(":id")
  async updatePost(@Param("id") id: number, @Body() body: any) {
    let post = await this._postService.getById(id);
    if (!post) {
      throw new HttpException("Post Found", HttpStatus.NOT_FOUND);
    }
    return {
      code: 200,
      data: await this._postService.updatePost(id, body),
    };
  }
}
