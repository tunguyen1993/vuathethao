import { Module } from "@nestjs/common";
import { PageItemProviders } from "./page-item.provider";
import { PageItemService } from "./page-item.service";
import { PageItemController } from "./page-item.controller";

@Module({
  providers: [...PageItemProviders, PageItemService],
  controllers: [PageItemController],
})
export class PageItemModule {}
