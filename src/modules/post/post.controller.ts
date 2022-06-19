import { Controller, Get, HttpException, Param, Req } from "@nestjs/common";
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
}
