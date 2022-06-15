import { Module } from "@nestjs/common";
import { CategoryItemProviders } from "./category-item.provider";

@Module({
  providers: [...CategoryItemProviders],
})
export class CategoryItemModule {}
