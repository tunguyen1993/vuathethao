import { Module } from "@nestjs/common";
import { CategoryProviders } from "./category.provider";

@Module({
  providers: [...CategoryProviders],
})
export class CategoryModule {}
