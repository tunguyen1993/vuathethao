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
import { Request, Response } from "express";
import { PageItemService } from "./page-item.service";

@Controller("api/v1/page-item")
export class PageItemController {
  constructor(private _pageItemService: PageItemService) {}

  @Get("home-page")
  getHomePage(@Req() request: Request, @Param() param) {}
}
