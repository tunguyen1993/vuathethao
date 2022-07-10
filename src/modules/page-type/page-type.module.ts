import { CacheModule, Module } from "@nestjs/common";
import { PageTypeProviders } from "./page-type.provider";
import { PageTypeService } from "./page-type.service";
import { PageTypeController } from "./page-type.controller";
import { AdminPageTypeController } from "./admin.page-type.controller";
import { FilterIpService } from "../../core/service/filterIp.service";
import { HttpModule } from "@nestjs/axios";
import type { ClientOpts } from "redis";

@Module({
  imports: [HttpModule],
  providers: [PageTypeService, ...PageTypeProviders, FilterIpService],
  controllers: [PageTypeController, AdminPageTypeController],
})
export class PageTypeModule {}
