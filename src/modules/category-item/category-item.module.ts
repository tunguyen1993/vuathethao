import { Module } from "@nestjs/common";
import { CategoryItemProviders } from "./category-item.provider";
import { CategoryItemController } from "./category-item.controller";
import { CategoryItemService } from "./category-item.service";

@Module({
  providers: [...CategoryItemProviders, CategoryItemService],
  controllers: [CategoryItemController],
})
export class CategoryItemModule {}
