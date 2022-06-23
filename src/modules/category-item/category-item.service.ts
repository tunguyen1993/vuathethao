import { Inject, Injectable } from "@nestjs/common";
import {
  CATEGORY_ITEM_REPOSITORY,
  PAGE_TYPE_REPOSITORY,
} from "../../core/constants";
import { baseService } from "../../core/service/base.service";
import { CategoryItemEntity } from "./category-item.entity";
import { PostEntity } from "../post/post.entity";
import { CategoryEntity } from "../category/category.entity";
import { UserEntity } from "../user/user.entity";
import { PageTypeEntity } from "../page-type/page-type.entity";
import { PageItemEntity } from "../page-item/page-item.entity";
import { Op } from "sequelize";

@Injectable()
export class CategoryItemService extends baseService {
  constructor(
    @Inject(CATEGORY_ITEM_REPOSITORY)
    private readonly categoryItemRepository: typeof CategoryItemEntity,
    @Inject(PAGE_TYPE_REPOSITORY)
    private readonly pageTypeRepository: typeof PageTypeEntity,
  ) {
    super(categoryItemRepository);
  }

  async getDataByCategory(category_id, limit, page) {
    /**
     * get list post in page_type has category same current category
     * @param records
     */
    let page_data = await this.pageTypeRepository.findOne({
      where: {
        type: "CATEGORY",
        category_id: category_id,
      },
      include: [
        {
          model: PageItemEntity,
          attributes: ["id"],
        },
      ],
    });

    let listId = [];
    page_data.items.map((item) => {
      listId.push(item.id);
    });

    let transform = (records) => {
      return records.map((record) => {
        return record;
      });
    };

    let search = {
      where: {
        category_id,
        post_id: {
          [Op.not]: listId,
        },
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
    };

    return this.paginationScroll(
      this.categoryItemRepository,
      page,
      limit,
      search,
      [],
      transform,
    );
  }

  async getDataByCategoryNoPagination(category_id, limit, page) {
    /**
     * get list post in page_type has category same current category
     * @param records
     */
    let page_data = await this.pageTypeRepository.findOne({
      where: {
        type: "POST",
        category_id: category_id,
      },
      include: [
        {
          model: PageItemEntity,
          attributes: ["id"],
        },
      ],
    });

    let listId = [];
    page_data.items.map((item) => {
      listId.push(item.id);
    });

    return this.categoryItemRepository.findAll({
      where: {
        category_id,
        post_id: {
          [Op.not]: listId,
        },
      },
      include: [
        {
          model: PostEntity,
          where: {
            status: "ENABLE",
          },
        },
      ],
      subQuery: false,
    });
  }
}
