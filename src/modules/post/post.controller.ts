import {
  Controller,
  Get,
  HttpException,
  Param,
  Query,
  Req,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { RealIP } from "nestjs-real-ip";
import { FilterIpService } from "../../core/service/filterIp.service";

@Controller("api/v1/post")
export class PostController {
  constructor(
    private _postService: PostService,
    private readonly _filterIpService: FilterIpService,
  ) {}

  @Get(":id")
  async getPostDetail(@Param("id") id: number, @RealIP() ip: string) {
    let filterModel = await this._filterIpService.filterIp(ip);

    let data = await this._postService.getById(id, filterModel);
    if (!data) {
      throw new HttpException("post is not exist", 400);
    }
    return {
      code: 200,
      data,
    };
  }

  @Get("get-by-category/:category_id")
  async getPost(
    @Param("category_id") category_id: string,
    @Query() query,
    @RealIP() ip: string,
  ) {
    let filterModel = await this._filterIpService.filterIp(ip);

    return {
      code: 200,
      data: await this._postService.getByCategory(
        parseInt(category_id),
        query.page,
        query.limit,
        filterModel,
      ),
    };
  }
}
