import { Body, Controller, Post, Query, Req, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { PageItemService } from "./page-item.service";
import { JwtAuthGuard } from "../../core/guards/jwtAuth.guard";

@UseGuards(JwtAuthGuard)
@Controller("api/v1/admin/page-item")
export class AdminPageItemController {
  constructor(private _pageItemService: PageItemService) {}

  @Post()
  async createPost(@Req() request: Request, @Body() body, @Query() query: any) {
    return {
      code: 200,
      data: await this._pageItemService.createData(
        body.page_id,
        body.page_type_id,
        body.data,
        !!query.fake,
      ),
    };
  }
}
