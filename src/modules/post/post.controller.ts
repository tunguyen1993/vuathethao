import { Controller, Get, Param, Req } from "@nestjs/common";
import { PostService } from "./post.service";

@Controller("api/v1/post")
export class PostController {
  constructor(private _postService: PostService) {}
}
