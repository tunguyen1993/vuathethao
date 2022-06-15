import { Module } from "@nestjs/common";
import { PageProviders } from "./page.provider";
import { PageController } from "./page.controller";
import { PageService } from "./page.service";

@Module({
  providers: [...PageProviders, PageService],
  controllers: [PageController],
  imports: [],
})
export class PageModule {}
