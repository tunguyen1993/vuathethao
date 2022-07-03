import { HttpException, Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "../../core/constants";
import { UserEntity } from "./user.entity";
import { catchError } from "rxjs";
import { baseService } from "../../core/service/base.service";
import { CategoryItemEntity } from "../category-item/category-item.entity";
import { CategoryEntity } from "../category/category.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService extends baseService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof UserEntity,
  ) {
    super(userRepository);
  }

  async findOneById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async create(user: any): Promise<UserEntity> {
    return await this.userRepository.create(user, {
      returning: true,
      individualHooks: true,
    });
  }

  async updateUser(user: UserEntity | any, data: any) {
    let update = await this.userRepository
      .update(data, {
        where: { id: user.id },
      })
      .catch(
        catchError((e) => {
          throw new HttpException(e.response.message, 400);
        }),
      );
    if (update) {
      return await this.findOneById(user.id);
    }
  }

  async updateUserClone(user_id, data: any) {
    data.password = await bcrypt.hash(
      data.password + process.env.PASS_SALT,
      10,
    );
    let update = await this.userRepository
      .update(data, {
        where: { id: user_id },
      })
      .catch(
        catchError((e) => {
          throw new HttpException(e.response.message, 400);
        }),
      );
    if (update) {
      return await this.findOneById(user_id);
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: {
        email,
        status: "ACTIVE",
      },
    });
  }

  async getListUser(page: number, limit: number) {
    let transform = (records) => {
      return records.map((record) => {
        return record;
      });
    };
    return this.paginationScroll(
      this.userRepository,
      page,
      limit,
      {},
      [["id", "DESC"]],
      transform,
    );
  }

  async deActiveUser(user_id) {
    let user = await this.findOneById(user_id);
    // console.log(user);
    user.status = "DEACTIVE";
    await user.save();
    return await this.findOneById(user_id);
  }

  async activeUser(user_id) {
    let user = await this.findOneById(user_id);
    // console.log(user);
    user.status = "ACTIVE";
    await user.save();
    return await this.findOneById(user_id);
  }
}
