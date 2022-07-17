import { Body, Controller, Get, Param, Post, Query, Req } from "@nestjs/common";
import { CategoryItemService } from "./category-item.service";
import { FilterIpService } from "../../core/service/filterIp.service";
import { RealIP } from "nestjs-real-ip";

@Controller("api/v1/category-item")
export class CategoryItemController {
  constructor(
    private _categoryService: CategoryItemService,
    private readonly _filterIpService: FilterIpService,
  ) {}

  @Get("agency")
  async agency(@Query() query, @RealIP() ip: string) {
    let filterModel = await this._filterIpService.filterIp(ip);
    return {
      code: 200,
      data: await this._categoryService.getDataByCategory(
        5,
        query.limit,
        query.page,
        filterModel,
      ),
    };
  }

  @Get("get-by-category/:category_id")
  async getList(
    @Query() query,
    @Param("category_id") category_id,
    @RealIP() ip: string,
  ) {
    console.log(ip);
    let filterModel = await this._filterIpService.filterIp(ip);
    console.log(filterModel);
    return {
      code: 200,
      data: await this._categoryService.getDataByCategory(
        category_id,
        query.limit,
        query.page,
        filterModel,
      ),
    };
  }

  @Get(":category_id")
  async getListNoPagination(
    @Query() query,
    @Param("category_id") category_id,
    @RealIP() ip: string,
  ) {
    let filterModel = await this._filterIpService.filterIp(ip);

    return {
      code: 200,
      data: await this._categoryService.getDataByCategoryNoPagination(
        category_id,
        filterModel,
      ),
    };
  }
}
