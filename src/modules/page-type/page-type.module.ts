import { Module } from "@nestjs/common";
import { PageTypeProviders } from "./page-type.provider";
import { PageTypeService } from "./page-type.service";
import { PageTypeController } from "./page-type.controller";
import { AdminPageTypeController } from "./admin.page-type.controller";

@Module({
  providers: [PageTypeService, ...PageTypeProviders],
  controllers: [PageTypeController, AdminPageTypeController],
})
export class PageTypeModule {}
