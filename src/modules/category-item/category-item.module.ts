import { Module } from "@nestjs/common";
import { CategoryItemProviders } from "./category-item.provider";
import { CategoryItemController } from "./category-item.controller";
import { CategoryItemService } from "./category-item.service";
import { CategoryItemAdminController } from "./category-item-admin.controller";

@Module({
  providers: [...CategoryItemProviders, CategoryItemService],
  controllers: [CategoryItemController, CategoryItemAdminController],
})
export class CategoryItemModule {}
