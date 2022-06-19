import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { PageService } from "./page.service";
import { Request, Response } from "express";

@Controller("api/v1/page")
export class PageController {
  constructor(private readonly _pageService: PageService) {}

  @Get(":id")
  async getHomePage(@Req() request: Request, @Param("id") id: number) {
    let data = await this._pageService.getDataBlock(id);
    if (!data) {
      throw new HttpException("Page Not Found", HttpStatus.NOT_FOUND);
    }
    return {
      code: 200,
      data,
    };
  }
}
