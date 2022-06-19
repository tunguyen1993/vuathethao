import { Controller, Get, Param } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller("api/v1/admin/category")
export class AdminCategoryController {
  constructor(private _categoryService: CategoryService) {}

  @Get()
  async data() {
    return {
      code: 200,
      data: await this._categoryService.getListCategory(),
    };
  }
}
