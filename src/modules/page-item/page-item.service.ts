import { Inject, Injectable } from "@nestjs/common";
import {
  PAGE_ITEM_FAKE_REPOSITORY,
  PAGE_ITEM_REPOSITORY,
} from "../../core/constants";
import { PageItemEntity } from "./page-item.entity";
import { PageItemFakeEntity } from "./page-item-fake.entity";

@Injectable()
export class PageItemService {
  constructor(
    @Inject(PAGE_ITEM_REPOSITORY)
    private readonly pageItemRepository: typeof PageItemEntity,
    @Inject(PAGE_ITEM_FAKE_REPOSITORY)
    private readonly pageItemFakeRepository: typeof PageItemFakeEntity,
  ) {}

  async createData(page_id, page_type_id, data, modelFake: boolean = false) {
    if (modelFake) {
      await this.pageItemFakeRepository.destroy({
        where: {
          page_id,
          page_type_id,
        },
      });
      return this.pageItemFakeRepository.bulkCreate(data);
    }
    await this.pageItemRepository.destroy({
      where: {
        page_id,
        page_type_id,
      },
    });
    return this.pageItemRepository.bulkCreate(data);
  }
}
