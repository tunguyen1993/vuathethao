import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  Req,
} from "@nestjs/common";
import { PageService } from "./page.service";
import { Request } from "express";

@Controller("api/v1/page")
export class PageController {
  constructor(private readonly _pageService: PageService) {}

  @Get(":id")
  async getHomePage(
    @Req() request: Request,
    @Param("id") id: number,
    @Query("fake") fake: string,
  ) {
    let data = await this._pageService.getDataBlock(id, !!fake);
    if (!data) {
      throw new HttpException("Page Not Found", HttpStatus.NOT_FOUND);
    }
    return {
      code: 200,
      data,
    };
  }
}
