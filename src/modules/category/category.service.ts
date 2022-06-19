import { Controller, Inject, Injectable } from "@nestjs/common";
import { CATEGORY_REPOSITORY } from "../../core/constants";
import { CategoryEntity } from "./category.entity";

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof CategoryEntity,
  ) {}

  async getListCategory() {
    return await this.categoryRepository.findAll({});
  }
}
