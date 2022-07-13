import { Inject, Injectable } from "@nestjs/common";
import {
  PAGE_TYPE_FAKE_REPOSITORY,
  PAGE_TYPE_REPOSITORY,
} from "../../core/constants";
import { PageTypeEntity } from "./page-type.entity";
import { PageItemEntity } from "../page-item/page-item.entity";
import { PostEntity } from "../post/post.entity";
import { CategoryEntity } from "../category/category.entity";
import { CategoryItemEntity } from "../category-item/category-item.entity";
import { UserEntity } from "../user/user.entity";
import { PageTypeFakeEntity } from "./page-type-fake.entity";
import { PageItemFakeEntity } from "../page-item/page-item-fake.entity";
import { PostFakeEntity } from "../post/post-fake.entity";
import { CategoryItemFakeEntity } from "../category-item/category-item-fake.entity";
import { CategoryFakeEntity } from "../category/category-fake.entity";

@Injectable()
export class PageTypeService {
  constructor(
    @Inject(PAGE_TYPE_REPOSITORY)
    private readonly pageTypeRepository: typeof PageTypeEntity,
    @Inject(PAGE_TYPE_FAKE_REPOSITORY)
    private readonly pageTypeFakeRepository: typeof PageTypeFakeEntity,
  ) {}

  async getListById(page_id: number, modelFake: boolean = false) {
    if (modelFake) {
      return this.pageTypeFakeRepository.findAll({
        where: {
          page_id,
        },
        order: [["order", "ASC"]],
        include: [
          {
            model: PageItemFakeEntity,
            include: [
              {
                model: PostFakeEntity,
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
          },
        ],
      });
    }
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
                "video_type",
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

  async getListByTypeId(id: number, modelFake: boolean = false) {
    if (modelFake) {
      return await this.pageTypeFakeRepository.findOne({
        where: {
          id,
        },
        order: [["order", "ASC"]],
        include: [
          {
            model: PageItemFakeEntity,
            include: [
              {
                model: PostFakeEntity,
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

  async updateCategoryId(
    id: number,
    category_id: number,
    modelFake: boolean = false,
  ) {
    if (modelFake) {
      return await this.pageTypeFakeRepository.update(
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
