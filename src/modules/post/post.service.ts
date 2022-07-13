import { Inject, Injectable } from "@nestjs/common";
import {
  CATEGORY_ITEM_FAKE_REPOSITORY,
  CATEGORY_ITEM_REPOSITORY,
  POST_FAKE_REPOSITORY,
  POST_REPOSITORY,
} from "../../core/constants";
import { PostEntity } from "./post.entity";
import { CategoryItemEntity } from "../category-item/category-item.entity";
import { baseService } from "../../core/service/base.service";
import { CategoryEntity } from "../category/category.entity";
import { UserEntity } from "../user/user.entity";
import { Op } from "sequelize";
import { PageTypeEntity } from "../page-type/page-type.entity";
import { PageItemEntity } from "../page-item/page-item.entity";
import { PostFakeEntity } from "./post-fake.entity";
import { CategoryItemFakeEntity } from "../category-item/category-item-fake.entity";
import { CategoryFakeEntity } from "../category/category-fake.entity";
import { PageTypeFakeEntity } from "../page-type/page-type-fake.entity";
import { PageItemFakeEntity } from "../page-item/page-item-fake.entity";

@Injectable()
export class PostService extends baseService {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: typeof PostEntity,
    @Inject(CATEGORY_ITEM_REPOSITORY)
    private readonly categoryItemRepository: typeof CategoryItemEntity,
    @Inject(POST_FAKE_REPOSITORY)
    private readonly postFakeRepository: typeof PostFakeEntity,
    @Inject(CATEGORY_ITEM_FAKE_REPOSITORY)
    private readonly categoryItemFakeRepository: typeof CategoryItemFakeEntity,
  ) {
    super(postRepository);
  }

  async getListByType(type, modelFake: boolean = false) {
    if (modelFake) {
      return this.postFakeRepository.findAll({
        where: {
          type,
          status: "ENABLE",
        },
        order: [["id", "DESC"]],
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
      });
    }
    return this.postRepository.findAll({
      where: {
        type,
        status: "ENABLE",
      },
      order: [["id", "DESC"]],
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
    sort,
    modelFake: boolean = false,
  ) {
    if (modelFake) {
      let transform = (records) => {
        return records.map((record) => {
          return record;
        });
      };
      let query = {
        where: {},
        include: [
          {
            model: CategoryItemFakeEntity,
            attributes: ["category_id"],
            where: {
              category_id: categorySelect,
            },
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
        if (filter_search.category) {
          query.include[0].where.category_id = filter_search.category;
        }
      }
      return this.paginationScroll(
        this.postFakeRepository,
        page,
        limit,
        query,
        [sort],
        transform,
      );
    }
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
      if (filter_search.category) {
        query.include[0].where.category_id = filter_search.category;
      }
    }
    return this.paginationScroll(
      this.postRepository,
      page,
      limit,
      query,
      [sort],
      transform,
    );
  }

  async createPost(post_data, modelFake: boolean = false) {
    if (modelFake) {
      let find_order = await this.postFakeRepository.findOne({
        where: { type: post_data.type },
        order: [["order", "DESC"]],
      });

      if (find_order) {
        post_data.order = find_order.order + 1;
      } else {
        post_data.order = 1;
      }

      let post = await this.postFakeRepository.create(post_data, {
        include: [CategoryItemFakeEntity],
        returning: true,
        individualHooks: true,
      });

      if (
        post_data.CategoryItemEntity &&
        post_data.CategoryItemEntity.category_id
      ) {
        await this.categoryItemFakeRepository.create(
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

  async deletePost(id: number, modelFake: boolean = false) {
    if (modelFake) {
      return await this.postFakeRepository.destroy({
        where: {
          id,
        },
      });
    }
    return await this.postRepository.destroy({
      where: {
        id,
      },
    });
  }

  async getById(id: number, modelFake: boolean = false) {
    if (modelFake) {
      return await this.postFakeRepository.findOne({
        where: {
          id,
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
      });
    }
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

  async updatePost(id: number, data_update: any, modelFake: boolean = false) {
    if (modelFake) {
      if (data_update.type) {
        await this.categoryItemFakeRepository.update(
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
        let currentPost = await this.getById(id, modelFake);
        if (data_update.order !== currentPost.order) {
          this.postFakeRepository.update(
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

      return await this.postFakeRepository.update(data_update, {
        where: {
          id,
        },
      });
    }
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

  async getByCategory(
    category_id: number,
    page,
    limit,
    modelFake: boolean = false,
  ) {
    if (modelFake) {
      let page_data = await PageTypeFakeEntity.findOne({
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
      page_data.items.map((item) => {
        listId.push(item.id);
      });
      let orders: any;
      if (
        category_id === 1 ||
        category_id === 4 ||
        category_id === 8 ||
        category_id === 15 ||
        category_id === 9
      ) {
        orders = [["id", "DESC"]];
      } else {
        orders = [["order", "ASC"]];
      }

      let search = {
        order: orders,
        where: {
          status: "ENABLE",
        },
        include: [
          {
            model: CategoryItemFakeEntity,
            where: {
              category_id,
            },
            required: true,
          },
        ],
        subQuery: false,
      };

      let transform = (records) => {
        return records.map((record) => record.post);
      };

      return this.paginationScroll(
        this.postFakeRepository,
        page,
        limit,
        search,
        [],
        transform,
      );
    }
    let page_data = await PageTypeEntity.findOne({
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
    let orders: any;
    if (
      category_id === 1 ||
      category_id === 4 ||
      category_id === 8 ||
      category_id === 15 ||
      category_id === 9
    ) {
      orders = [["id", "DESC"]];
    } else {
      orders = [["order", "ASC"]];
    }

    let search = {
      order: orders,
      where: {
        status: "ENABLE",
      },
      include: [
        {
          model: CategoryItemEntity,
          where: {
            category_id,
          },
          required: true,
        },
      ],
      subQuery: false,
    };

    let transform = (records) => {
      return records.map((record) => record.post);
    };

    return this.paginationScroll(
      this.postRepository,
      page,
      limit,
      search,
      [],
      transform,
    );
  }
}
