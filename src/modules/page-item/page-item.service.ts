import { Inject, Injectable } from "@nestjs/common";
import { PAGE_ITEM_REPOSITORY } from "../../core/constants";
import { PageItemEntity } from "./page-item.entity";

@Injectable()
export class PageItemService {
  constructor(
    @Inject(PAGE_ITEM_REPOSITORY)
    private readonly pageItemRepository: typeof PageItemEntity,
  ) {}

  async createData() {}
}
