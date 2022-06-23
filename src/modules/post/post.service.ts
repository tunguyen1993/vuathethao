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
      [["order", "ASC"]],
      transform,
    );
  }

  async createPost(post_data) {
    let find_order = await this.postRepository.findOne({
      where: { type: post_data.type },
      order: [["order", "DESC"]],
    });

    if (find_order) {
      post_data.order = find_order.order + 1;
    } else {
      post_data.order = 1;
    }

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
    if (data_update.type) {
      await this.categoryItemRepository.update(
        {
          category_id: data_update.type,
        },
        {
          where: {
            post_id: id,
          },
        },
      );
      delete data_update.type;
    }

    if (data_update.order) {
      let currentPost = await this.getById(id);
      if (data_update.order !== currentPost.order) {
        this.postRepository.update(
          { order: currentPost.order },
          {
            where: {
              order: data_update.order,
              type: currentPost.type,
            },
          },
        );
      }
    }

    return await this.postRepository.update(data_update, {
      where: {
        id,
      },
    });
  }
}
