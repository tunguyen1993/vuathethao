import { Controller, Inject, Injectable } from "@nestjs/common";
import { NOTIFY_REPOSITORY } from "../../core/constants";
import { NotifyEntity } from "./notify.entity";
import { baseService } from "../../core/service/base.service";
import { PostEntity } from "../post/post.entity";

@Injectable()
export class NotifyService extends baseService {
  constructor(
    @Inject(NOTIFY_REPOSITORY)
    private readonly notifyRepository: typeof NotifyEntity,
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
      this.notifyRepository,
      page,
      limit,
      {
        include: [PostEntity],
        subQuery: false,
      },
      [],
      transform,
    );
  }
}
