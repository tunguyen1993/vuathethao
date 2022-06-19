import { Body, Controller, Post, Req } from "@nestjs/common";
import { Request, Response } from "express";
import { PageItemService } from "./page-item.service";

@Controller("api/v1/admin/page-item")
export class AdminPageItemController {
  constructor(private _pageItemService: PageItemService) {}

  @Post()
  async createPost(@Req() request: Request, @Body() body) {
    return {
      code: 200,
      data: await this._pageItemService.createData(
        body.page_id,
        body.page_type_id,
        body.data,
      ),
    };
  }
}
