import { Body, Controller, Get, Param, Post, Query, Req } from "@nestjs/common";
import { CategoryItemService } from "./category-item.service";

@Controller("api/v1/admin/category-item")
export class CategoryItemAdminController {
  constructor(private _categoryService: CategoryItemService) {}

  @Get("agency")
  async agency(@Query() query) {
    return {
      code: 200,
      data: await this._categoryService.getDataByCategory(
        5,
        query.limit,
        query.page,
      ),
    };
  }

  @Get("get-by-category/:category_id")
  async getList(@Query() query, @Param("category_id") category_id) {
    return {
      code: 200,
      data: await this._categoryService.getDataByCategory(
        category_id,
        query.limit,
        query.page,
      ),
    };
  }

  @Get(":category_id")
  async getListNoPagination(@Query() query, @Param("category_id") category_id) {
    return {
      code: 200,
      data: await this._categoryService.getDataByCategoryNoPagination(
        category_id,
      ),
    };
  }
}
