import { Inject, Injectable } from "@nestjs/common";
import { CATEGORY_ITEM_REPOSITORY } from "../../core/constants";
import { baseService } from "../../core/service/base.service";
import { CategoryItemEntity } from "./category-item.entity";
import { PostEntity } from "../post/post.entity";

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
        include: [PostEntity],
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
