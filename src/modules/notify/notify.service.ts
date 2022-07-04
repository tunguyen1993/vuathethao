import { Controller, Inject, Injectable } from "@nestjs/common";
import { NOTIFY_REPOSITORY, POST_REPOSITORY } from "../../core/constants";
import { NotifyEntity } from "./notify.entity";
import { baseService } from "../../core/service/base.service";
import { PostEntity } from "../post/post.entity";

@Injectable()
export class NotifyService extends baseService {
  constructor(
    @Inject(NOTIFY_REPOSITORY)
    private readonly notifyRepository: typeof NotifyEntity,
    @Inject(POST_REPOSITORY)
    private readonly postRepository: typeof PostEntity,
  ) {
    super(notifyRepository);
  }

  async getNotify(page, limit) {
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
        where: {
          type: "NOTIFY",
        },
      },
      [["createdAt", "DESC"]],
      transform,
    );
  }
}
