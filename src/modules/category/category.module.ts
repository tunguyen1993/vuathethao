import { Module } from "@nestjs/common";
import { CategoryProviders } from "./category.provider";
import { AdminCategoryController } from "./admin.category.controller";
import { CategoryService } from "./category.service";

@Module({
  providers: [...CategoryProviders, CategoryService],
  controllers: [AdminCategoryController],
})
export class CategoryModule {}
