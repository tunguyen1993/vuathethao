import { Controller, Get, Param, Req } from "@nestjs/common";
import { Request } from "express";
import { PageTypeService } from "./page-type.service";

@Controller("api/v1/page-type")
export class PageTypeController {
  constructor(private readonly _pageTypeService: PageTypeService) {}

  @Get("home-page")
  async getHomePage(@Req() request: Request, @Param() param) {
    return {
      code: 200,
      data: await this._pageTypeService.getListById(1),
    };
  }

  @Get("e-sport")
  async getESport(@Req() request: Request, @Param() param) {
    return {
      code: 200,
      data: await this._pageTypeService.getListById(2),
    };
  }

  @Get("game-card")
  async getGameCard(@Req() request: Request, @Param() param) {
    return {
      code: 200,
      data: await this._pageTypeService.getListById(3),
    };
  }

  @Get("discount")
  async getUuDai(@Req() request: Request, @Param() param) {
    return {
      code: 200,
      data: await this._pageTypeService.getListById(4),
    };
  }

  @Get("videos")
  async getVideos(@Req() request: Request, @Param() param) {
    return {
      code: 200,
      data: await this._pageTypeService.getListById(5),
    };
  }

  @Get("agency")
  async getAgency(@Req() request: Request, @Param() param) {
    return {
      code: 200,
      data: await this._pageTypeService.getListById(6),
    };
  }

  @Get("subscribe")
  async subscribe(@Req() request: Request, @Param() param) {
    return {
      code: 200,
      data: await this._pageTypeService.getListById(7),
    };
  }
}
