import { Controller, Get, Param, Req } from "@nestjs/common";
import { Request } from "express";
import { PageTypeService } from "./page-type.service";
import { RealIP } from "nestjs-real-ip";
import { FilterIpService } from "../../core/service/filterIp.service";

@Controller("api/v1/page-type")
export class PageTypeController {
  constructor(
    private readonly _pageTypeService: PageTypeService,
    private readonly _filterIpService: FilterIpService,
  ) {}

  @Get("home-page")
  async getHomePage(
    @Req() request: Request,
    @Param() param,
    @RealIP() ip: string,
  ) {
    let filterModel = await this._filterIpService.filterIp(ip);
    return {
      code: 200,
      data: await this._pageTypeService.getListById(1, filterModel),
    };
  }

  @Get("e-sport")
  async getESport(
    @Req() request: Request,
    @Param() param,
    @RealIP() ip: string,
  ) {
    let filterModel = await this._filterIpService.filterIp(ip);
    return {
      code: 200,
      data: await this._pageTypeService.getListById(2, filterModel),
    };
  }

  @Get("game-card")
  async getGameCard(
    @Req() request: Request,
    @Param() param,
    @RealIP() ip: string,
  ) {
    let filterModel = await this._filterIpService.filterIp(ip);

    return {
      code: 200,
      data: await this._pageTypeService.getListById(3, filterModel),
    };
  }

  @Get("discount")
  async getUuDai(
    @Req() request: Request,
    @Param() param,
    @RealIP() ip: string,
  ) {
    let filterModel = await this._filterIpService.filterIp(ip);

    return {
      code: 200,
      data: await this._pageTypeService.getListById(4, filterModel),
    };
  }

  @Get("videos")
  async getVideos(
    @Req() request: Request,
    @Param() param,
    @RealIP() ip: string,
  ) {
    let filterModel = await this._filterIpService.filterIp(ip);

    return {
      code: 200,
      data: await this._pageTypeService.getListById(5, filterModel),
    };
  }

  @Get("agency")
  async getAgency(
    @Req() request: Request,
    @Param() param,
    @RealIP() ip: string,
  ) {
    let filterModel = await this._filterIpService.filterIp(ip);

    return {
      code: 200,
      data: await this._pageTypeService.getListById(6, filterModel),
    };
  }

  @Get("subscribe")
  async subscribe(
    @Req() request: Request,
    @Param() param,
    @RealIP() ip: string,
  ) {
    let filterModel = await this._filterIpService.filterIp(ip);

    return {
      code: 200,
      data: await this._pageTypeService.getListById(7, filterModel),
    };
  }

  @Get("sport")
  async sport(@Req() request: Request, @Param() param, @RealIP() ip: string) {
    let filterModel = await this._filterIpService.filterIp(ip);

    return {
      code: 200,
      data: await this._pageTypeService.getListById(8, filterModel),
    };
  }

  @Get("livestream")
  async livestream(
    @Req() request: Request,
    @Param() param,
    @RealIP() ip: string,
  ) {
    let filterModel = await this._filterIpService.filterIp(ip);

    return {
      code: 200,
      data: await this._pageTypeService.getListById(9, filterModel),
    };
  }
}
