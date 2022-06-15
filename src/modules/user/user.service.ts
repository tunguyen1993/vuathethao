import { HttpException, Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "../../core/constants";
import { UserEntity } from "./user.entity";
import { catchError } from "rxjs";

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof UserEntity,
  ) {}

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

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
