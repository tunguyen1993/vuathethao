import {
  Controller,
  Delete,
  Get,
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

  @Get()
  getHomePage(@Req() request: Request, @Param() param) {
    return this._pageService.getDataBlockFrontPage();
  }
}
