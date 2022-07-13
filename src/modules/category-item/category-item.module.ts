import { Module } from "@nestjs/common";
import { CategoryItemProviders } from "./category-item.provider";
import { CategoryItemController } from "./category-item.controller";
import { CategoryItemService } from "./category-item.service";
import { CategoryItemAdminController } from "./category-item-admin.controller";
import { FilterIpService } from "../../core/service/filterIp.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  providers: [...CategoryItemProviders, CategoryItemService, FilterIpService],
  controllers: [CategoryItemController, CategoryItemAdminController],
})
export class CategoryItemModule {}
