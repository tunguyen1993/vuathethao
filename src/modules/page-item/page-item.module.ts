import { Module } from "@nestjs/common";
import { PageItemProviders } from "./page-item.provider";
import { PageItemService } from "./page-item.service";
import { PageItemController } from "./page-item.controller";
import { AdminPageItemController } from "./admin-page-item.controller";

@Module({
  providers: [...PageItemProviders, PageItemService],
  controllers: [PageItemController, AdminPageItemController],
})
export class PageItemModule {}
