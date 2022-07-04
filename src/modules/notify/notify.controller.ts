import { Controller, Get, Param, Query } from "@nestjs/common";
import { NotifyService } from "./notify.service";
import { PostEntity } from "../post/post.entity";

@Controller("api/v1/notifications")
export class NotifyController {
  constructor(private _notifyService: NotifyService) {}

  @Get()
  async data(@Query() query) {
    return {
      code: 200,
      data: await this._notifyService.getNotify(query.limit, query.page),
      error: null,
    };
  }
}
