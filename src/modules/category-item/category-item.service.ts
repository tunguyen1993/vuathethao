import { Inject, Injectable } from "@nestjs/common";
import {
  CATEGORY_ITEM_FAKE_REPOSITORY,
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
import { col, Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { CategoryItemFakeEntity } from "./category-item-fake.entity";
import { PageTypeFakeEntity } from "../page-type/page-type-fake.entity";
import { PageItemFakeEntity } from "../page-item/page-item-fake.entity";
import { PostFakeEntity } from "../post/post-fake.entity";
import { CategoryFakeEntity } from "../category/category-fake.entity";

@Injectable()
export class CategoryItemService extends baseService {
  constructor(
    @Inject(CATEGORY_ITEM_REPOSITORY)
    private readonly categoryItemRepository: typeof CategoryItemEntity,
    @Inject(PAGE_TYPE_REPOSITORY)
    private readonly pageTypeRepository: typeof PageTypeEntity,
    @Inject(CATEGORY_ITEM_FAKE_REPOSITORY)
    private readonly categoryItemFakeRepository: typeof CategoryItemFakeEntity,
    @Inject(PAGE_TYPE_REPOSITORY)
    private readonly pageTypeFakeRepository: typeof PageTypeFakeEntity,
  ) {
    super(categoryItemRepository);
  }

  async getDataByCategory(
    category_id,
    limit,
    page,
    modelFake: boolean = false,
  ) {
    let transform = (records) => {
      return records.map((record) => {
        return record;
      });
    };

    if (modelFake) {
      let page_data = await this.pageTypeFakeRepository.findOne({
        where: {
          type: "CATEGORY",
          category_id: category_id,
        },
        include: [
          {
            model: PageItemFakeEntity,
            attributes: ["id"],
          },
        ],
      });
      let listId = [];
      if (page_data) {
        page_data.items.map((item) => {
          listId.push(item.id);
        });
      }

      let orders = [];
      if (
        category_id === "1" ||
        category_id === "4" ||
        category_id === "7" ||
        category_id === "8" ||
        category_id === "9" ||
        category_id === "13" ||
        category_id === "14" ||
        category_id === "6"
      ) {
        orders = [[{ model: PostFakeEntity, as: "post" }, "createdAt", "DESC"]];
      } else {
        orders = [[{ model: PostFakeEntity, as: "post" }, "order", "ASC"]];
      }

      let search = {
        where: {
          category_id,
          post_id: {
            [Op.not]: listId,
          },
        },
        include: [
          {
            model: PostFakeEntity,
            where: {
              status: "ENABLE",
            },
            include: [
              {
                model: CategoryItemFakeEntity,
                attributes: ["category_id"],
                include: [
                  {
                    model: CategoryFakeEntity,
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
        orders,
        transform,
      );
    }

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
    if (page_data) {
      page_data.items.map((item) => {
        listId.push(item.id);
      });
    }

    let orders = [];
    if (
      category_id === "1" ||
      category_id === "4" ||
      category_id === "7" ||
      category_id === "8" ||
      category_id === "9" ||
      category_id === "13" ||
      category_id === "14"
    ) {
      orders = [[{ model: PostEntity, as: "post" }, "createdAt", "DESC"]];
    } else {
      orders = [[{ model: PostEntity, as: "post" }, "order", "ASC"]];
    }

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
          where: {
            status: "ENABLE",
          },
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
      this.categoryItemFakeRepository,
      page,
      limit,
      search,
      orders,
      transform,
    );
  }

  async getDataByCategoryNoPagination(category_id, modelFake: boolean = false) {
    if (modelFake) {
      let page_data = await this.pageTypeFakeRepository.findOne({
        where: {
          type: "POST",
          category_id: category_id,
        },
        include: [
          {
            model: PageItemFakeEntity,
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
