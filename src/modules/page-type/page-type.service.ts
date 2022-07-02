import { Inject, Injectable } from "@nestjs/common";
import { PAGE_TYPE_REPOSITORY } from "../../core/constants";
import { PageTypeEntity } from "./page-type.entity";
import { PageItemEntity } from "../page-item/page-item.entity";
import { PostEntity } from "../post/post.entity";
import { CategoryEntity } from "../category/category.entity";
import { CategoryItemEntity } from "../category-item/category-item.entity";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class PageTypeService {
  constructor(
    @Inject(PAGE_TYPE_REPOSITORY)
    private readonly pageTypeRepository: typeof PageTypeEntity,
  ) {}

  async getListById(page_id: number) {
    return await this.pageTypeRepository.findAll({
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
              attributes: [
                "image",
                "id",
                "title",
                "link",
                "video",
                "type",
                "status",
                "promotion",
                "view",
                "order",
                "pricing",
                "user_id",
                "createdAt",
                "updatedAt",
              ],
              include: [
                {
                  model: CategoryItemEntity,
                  attributes: ["category_id"],
                  include: [
                    {
                      model: CategoryEntity,
                      attributes: ["name"],
                    },
                  ],
                },
                {
                  model: UserEntity,
                  attributes: ["full_name", "email"],
                },
              ],
            },
          ],
        },
      ],
    });
  }

  async getListByTypeId(id: number) {
    return await this.pageTypeRepository.findOne({
      where: {
        id,
      },
      order: [["order", "ASC"]],
      include: [
        {
          model: PageItemEntity,
          include: [
            {
              model: PostEntity,
              attributes: [
                "image",
                "id",
                "title",
                "link",
                "video",
                "type",
                "status",
                "promotion",
                "view",
                "order",
                "pricing",
                "user_id",
                "createdAt",
                "updatedAt",
              ],
            },
          ],
        },
      ],
    });
  }

  async updateCategoryId(id: number, category_id: number) {
    return await this.pageTypeRepository.update(
      {
        category_id,
      },
      {
        where: {
          id,
        },
      },
    );
  }
}
