import { Inject, Injectable } from "@nestjs/common";
import {
  CATEGORY_ITEM_REPOSITORY,
  POST_REPOSITORY,
} from "../../core/constants";
import { PostEntity } from "./post.entity";
import { CategoryItemEntity } from "../category-item/category-item.entity";
import { baseService } from "../../core/service/base.service";
import { CategoryEntity } from "../category/category.entity";
import { UserEntity } from "../user/user.entity";
import { Op } from "sequelize";

@Injectable()
export class PostService extends baseService {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: typeof PostEntity,
    @Inject(CATEGORY_ITEM_REPOSITORY)
    private readonly categoryItemRepository: typeof CategoryItemEntity,
  ) {
    super(postRepository);
  }

  async getListByType(type) {
    return this.postRepository.findAll({
      where: {
        type,
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
    });
  }

  async getListPost(
    page,
    limit,
    categorySelect,
    filter_search: any = undefined,
  ) {
    let transform = (records) => {
      return records.map((record) => {
        return record;
      });
    };
    let query = {
      where: {},
      include: [
        {
          model: CategoryItemEntity,
          attributes: ["category_id"],
          where: {
            category_id: categorySelect,
          },
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
      subQuery: false,
    };
    if (filter_search) {
      if (filter_search.search) {
        query.where = {
          ...query.where,
          title: {
            [Op.like]: `%${filter_search}%`,
          },
        };
      }
      console.log(filter_search.category);
      if (filter_search.category) {
        query.include[0].where.category_id = filter_search.category;
      }
    }
    return this.paginationScroll(
      this.postRepository,
      page,
      limit,
      query,
      [["id", "DESC"]],
      transform,
    );
  }

  async createPost(post_data) {
    let post = await this.postRepository.create(post_data, {
      include: [CategoryItemEntity],
      returning: true,
      individualHooks: true,
    });

    if (
      post_data.CategoryItemEntity &&
      post_data.CategoryItemEntity.category_id
    ) {
      await this.categoryItemRepository.create(
        {
          post_id: post.id,
          category_id: post_data.CategoryItemEntity.category_id,
        },
        {
          returning: true,
          individualHooks: true,
        },
      );
    }

    return post;
  }

  async deletePost(id: number) {
    return await this.postRepository.destroy({
      where: {
        id,
      },
    });
  }

  async getById(id: number) {
    return await this.postRepository.findOne({
      where: {
        id,
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
    });
  }

  async updatePost(id: number, data_update: any) {
    return await this.postRepository.update(data_update, {
      where: {
        id,
      },
    });
  }
}
