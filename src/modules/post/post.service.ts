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

  async getListPost(page, limit) {
    let transform = (records) => {
      return records.map((record) => {
        return record;
      });
    };
    return this.paginationScroll(
      this.postRepository,
      page,
      limit,
      {
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
        subQuery: false,
      },
      [["id", "DESC"]],
      transform,
    );
  }

  async createPost(post_data) {
    let post = await this.postRepository.create(post_data, {
      include: [CategoryItemEntity],
    });

    if (
      post_data.CategoryItemEntity &&
      post_data.CategoryItemEntity.category_id
    ) {
      await this.categoryItemRepository.create({
        post_id: post.id,
        category_id: post_data.CategoryItemEntity.category_id,
      });
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
