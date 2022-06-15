import { Controller, Get, Param, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { PostService } from "./post.service";

@Controller("api/v1/admin/post")
export class PostController {
  constructor(private _postService: PostService) {}

  @Post()
  createPost() {}
}
