import { Inject, Injectable } from "@nestjs/common";
import { PAGE_FAKE_REPOSITORY, PAGE_REPOSITORY } from "../../core/constants";
import { PageEntity } from "./page.entity";
import { PageTypeEntity } from "../page-type/page-type.entity";
import { PageItemEntity } from "../page-item/page-item.entity";
import { PageFakeEntity } from "./page-fake.entity";
import { PageTypeFakeEntity } from "../page-type/page-type-fake.entity";

@Injectable()
export class PageService {
  constructor(
    @Inject(PAGE_REPOSITORY)
    private readonly pageRepository: typeof PageEntity,
    @Inject(PAGE_FAKE_REPOSITORY)
    private readonly pageFakeRepository: typeof PageFakeEntity,
  ) {}

  async getDataBlock(id: number, modelFake: boolean = false) {
    if (modelFake) {
      let data = await this.pageFakeRepository.findOne({
        where: {
          id,
        },
        include: [
          {
            model: PageTypeFakeEntity,
            as: "pageTypes",
            order: [["order", "DESC"]],
          },
        ],
      });
      data.pageTypes.sort((a, b) => (a.order > b.order ? 1 : -1));
      return data;
    }
    let data = await this.pageRepository.findOne({
      where: {
        id,
      },
      include: [
        {
          model: PageTypeEntity,
          as: "pageTypes",
          order: [["order", "DESC"]],
        },
      ],
    });
    data.pageTypes.sort((a, b) => (a.order > b.order ? 1 : -1));
    return data;
  }
}
