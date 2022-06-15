import { Controller, Get, Param, Req } from "@nestjs/common";
import { Request } from "express";
import { PageTypeService } from "./page-type.service";

@Controller("api/v1/page-type")
export class PageTypeController {
  constructor(private readonly _pageTypeService: PageTypeService) {}

  @Get("home-page")
  getHomePage(@Req() request: Request, @Param() param) {
    return this._pageTypeService.getListById(1);
  }

  @Get("e-sport")
  getESport(@Req() request: Request, @Param() param) {
    return this._pageTypeService.getListById(2);
  }

  @Get("game-card")
  getGameCard(@Req() request: Request, @Param() param) {
    return this._pageTypeService.getListById(3);
  }

  @Get("discount")
  getUuDai(@Req() request: Request, @Param() param) {
    return this._pageTypeService.getListById(4);
  }

  @Get("videos")
  getVideos(@Req() request: Request, @Param() param) {
    return this._pageTypeService.getListById(5);
  }

  @Get("agency")
  getAgency(@Req() request: Request, @Param() param) {
    return this._pageTypeService.getListById(6);
  }

  @Get("subscribe")
  subscribe(@Req() request: Request, @Param() param) {
    return this._pageTypeService.getListById(7);
  }
}
