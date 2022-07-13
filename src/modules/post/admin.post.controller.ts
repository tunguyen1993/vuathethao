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
  async getPosts(@Query() query: any) {
    return {
      code: 200,
      data: await this._postService.getListByType(query.type, !!query.fake),
    };
  }

  @Get("ads")
  async getListAdvertisements(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(
        query.page,
        query.limit,
        [15],
        undefined,
        [query.sort_by, query.order_by],
        !!query.fake,
      ),
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
        [query.sort_by, query.order_by],
        !!query.fake,
      ),
    };
  }

  @Get("deals")
  async getListDeals(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(
        query.page,
        query.limit,
        [3],
        undefined,
        [query.sort_by, query.order_by],
        !!query.fake,
      ),
    };
  }

  @Get("game-card")
  async getListGameCard(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(
        query.page,
        query.limit,
        [2],
        undefined,
        [query.sort_by, query.order_by],
        !!query.fake,
      ),
    };
  }

  @Get("game-mobile")
  async getGameMobile(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(
        query.page,
        query.limit,
        [6],
        undefined,
        [query.sort_by, query.order_by],
        !!query.fake,
      ),
    };
  }

  @Get("agency")
  async getAgency(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(
        query.page,
        query.limit,
        [5],
        undefined,
        [query.sort_by, query.order_by],
        !!query.fake,
      ),
    };
  }

  @Get("notify")
  async getNotify(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(
        query.page,
        query.limit,
        [14],
        undefined,
        [query.sort_by, query.order_by],
        !!query.fake,
      ),
    };
  }

  @Get("subscribe")
  async getSubscribe(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(
        query.page,
        query.limit,
        [7],
        undefined,
        [query.sort_by, query.order_by],
        !!query.fake,
      ),
    };
  }

  @Get("livestream")
  async livestream(@Query() query) {
    return {
      code: 200,
      data: await this._postService.getListPost(
        query.page,
        query.limit,
        [9],
        undefined,
        [query.sort_by, query.order_by],
        !!query.fake,
      ),
    };
  }

  @Post("create-post")
  async createPost(@Body() body: any, @Req() request: Request, @Query() query) {
    return {
      code: 200,
      data: await this._postService.createPost(
        {
          ...body,
          user_id: request.user["id"],
        },
        !!query.fake,
      ),
    };
  }

  @Post("create-video")
  async createVideo(@Body() body: any, @Query() query) {
    return {
      code: 200,
      data: await this._postService.createPost(body, !!query.fake),
    };
  }

  @Post("create-game-card")
  async createGameCard(@Body() body: any, @Query() query) {
    return {
      code: 200,
      data: await this._postService.createPost(body, !!query.fake),
    };
  }

  @Post("create-game-mobile")
  async createGameMobile(@Body() body: any, @Query() query) {
    return {
      code: 200,
      data: await this._postService.createPost(body, !!query.fake),
    };
  }

  @Post("create-advertisement")
  async createAdvertisement(@Body() body: any, @Query() query) {
    return {
      code: 200,
      data: await this._postService.createPost(body, !!query.fake),
    };
  }

  @Post("create-agency")
  async createAgency(@Body() body: any, @Query() query) {
    return {
      code: 200,
      data: await this._postService.createPost(body, !!query.fake),
    };
  }

  @Post("create-deal")
  async createDeal(@Body() body: any, @Query() query) {
    return {
      code: 200,
      data: await this._postService.createPost(body, !!query.fake),
    };
  }

  @Delete(":id")
  async deletePostId(@Param("id") id: number, @Query() query) {
    return {
      code: 200,
      data: await this._postService.deletePost(id, !!query.fake),
    };
  }

  @Put(":id")
  async updatePost(@Param("id") id: number, @Body() body: any, @Query() query) {
    let post = await this._postService.getById(id, !!query.fake);
    if (!post) {
      throw new HttpException("Post Found", HttpStatus.NOT_FOUND);
    }
    return {
      code: 200,
      data: await this._postService.updatePost(id, body, !!query.fake),
    };
  }
}
