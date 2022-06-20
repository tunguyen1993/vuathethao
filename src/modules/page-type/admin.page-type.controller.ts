import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { PageTypeService } from "./page-type.service";
import { JwtAuthGuard } from "../../core/guards/jwtAuth.guard";

@UseGuards(JwtAuthGuard)
@Controller("api/v1/admin/page-type")
export class AdminPageTypeController {
  constructor(private readonly _pageTypeService: PageTypeService) {}

  @Get(":page_id")
  async getHomePage(
    @Req() request: Request,
    @Param("page_id") page_id: number,
  ) {
    return {
      code: 200,
      data: await this._pageTypeService.getListByTypeId(page_id),
    };
  }

  @Put(":page_id")
  async updateData(
    @Req() request: Request,
    @Param("page_id") page_id: number,
    @Body("category_id") category_id: number,
  ) {
    return {
      code: 200,
      data: await this._pageTypeService.updateCategoryId(page_id, category_id),
    };
  }
}
