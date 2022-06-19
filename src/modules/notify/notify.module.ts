import { Module } from "@nestjs/common";
import { NotifyProviders } from "./notify.provider";
import { NotifyService } from "./notify.service";
import { NotifyController } from "./notify.controller";

@Module({
  providers: [...NotifyProviders, NotifyService],
  controllers: [NotifyController],
})
export class NotifyModule {}
