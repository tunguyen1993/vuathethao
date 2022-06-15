import { Inject, Injectable } from "@nestjs/common";
import { PAGE_TYPE_REPOSITORY } from "../../core/constants";
import { PageTypeEntity } from "./page-type.entity";
import { PageItemEntity } from "../page-item/page-item.entity";
import { PostEntity } from "../post/post.entity";
import { CategoryEntity } from "../category/category.entity";
import { CategoryItemEntity } from "../category-item/category-item.entity";

@Injectable()
export class PageTypeService {
  constructor(
    @Inject(PAGE_TYPE_REPOSITORY)
    private readonly pageItemRepository: typeof PageTypeEntity,
  ) {}

  async getListById(page_id: number) {
    return await this.pageItemRepository.findAll({
      where: {
        page_id,
      },
      order: [["order", "ASC"]],
      include: [
        {
          model: PageItemEntity,
          include: [
            {
              model: PostEntity,
            },
          ],
        },
        {
          model: CategoryEntity,
          include: [
            {
              model: CategoryItemEntity,
              include: [
                {
                  model: PostEntity,
                  limit: 10,
                  separate: false,
                },
              ],
            },
          ],
        },
      ],
    });
  }
}
