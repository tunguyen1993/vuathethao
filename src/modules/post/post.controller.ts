import {
  Controller,
  Get,
  HttpException,
  Param,
  Query,
  Req,
} from "@nestjs/common";
import { PostService } from "./post.service";

@Controller("api/v1/post")
export class PostController {
  constructor(private _postService: PostService) {}

  @Get(":id")
  async getPostDetail(@Param("id") id: number) {
    let data = await this._postService.getById(id);
    if (!data) {
      throw new HttpException("post is not exist", 400);
    }
    return {
      code: 200,
      data,
    };
  }

  @Get("get-by-category/:category_id")
  async getPost(@Param("category_id") category_id: string, @Query() query) {
    return {
      code: 200,
      data: await this._postService.getByCategory(
        parseInt(category_id),
        query.page,
        query.limit,
      ),
    };
  }
}
