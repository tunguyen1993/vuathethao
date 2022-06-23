import { Inject, Injectable } from "@nestjs/common";
import { PAGE_ITEM_REPOSITORY } from "../../core/constants";
import { PageItemEntity } from "./page-item.entity";

@Injectable()
export class PageItemService {
  constructor(
    @Inject(PAGE_ITEM_REPOSITORY)
    private readonly pageItemRepository: typeof PageItemEntity,
  ) {}

  async createData(page_id, page_type_id, data) {
    await this.pageItemRepository.destroy({
      where: {
        page_id,
        page_type_id,
      },
    });
    console.log(data);
    return this.pageItemRepository.bulkCreate(data);
  }
}
