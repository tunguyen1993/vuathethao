import { Inject, Injectable } from "@nestjs/common";
import { PAGE_REPOSITORY } from "../../core/constants";
import { PageEntity } from "./page.entity";
import { PageTypeEntity } from "../page-type/page-type.entity";
import { PageItemEntity } from "../page-item/page-item.entity";

@Injectable()
export class PageService {
  constructor(
    @Inject(PAGE_REPOSITORY) private readonly pageRepository: typeof PageEntity,
  ) {}

  async getDataBlockFrontPage() {
    return await this.pageRepository.findOne({
      include: [PageTypeEntity],
    });
  }
}
