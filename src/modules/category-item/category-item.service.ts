import { Inject, Injectable } from "@nestjs/common";
import { CATEGORY_ITEM_REPOSITORY } from "../../core/constants";
import { baseService } from "../../core/service/base.service";
import { CategoryItemEntity } from "./category-item.entity";
import { PostEntity } from "../post/post.entity";
import { CategoryEntity } from "../category/category.entity";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class CategoryItemService extends baseService {
  constructor(
    @Inject(CATEGORY_ITEM_REPOSITORY)
    private readonly categoryItemRepository: typeof CategoryItemEntity,
  ) {
    super(categoryItemRepository);
  }

  async getDataByCategory(category_id, limit, page) {
    let transform = (records) => {
      return records.map((record) => {
        return record;
      });
    };

    return this.paginationScroll(
      this.categoryItemRepository,
      page,
      limit,
      {
        where: {
          category_id,
        },
        include: [
          {
            model: PostEntity,
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
        subQuery: false,
      },
      [],
      transform,
    );
  }

  async getDataByCategoryNoPagination(category_id, limit, page) {
    return this.categoryItemRepository.findAll({
      where: {
        category_id,
      },
      include: [PostEntity],
      subQuery: false,
    });
  }
}
