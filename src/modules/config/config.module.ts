import { Module } from "@nestjs/common";
import { ConfigProviders } from "./config.provider";
import { ConfigService } from "./config.service";
import { ConfigController } from './config.controller';

@Module({
  providers: [...ConfigProviders, ConfigService],
  controllers: [ConfigController],
})
export class ConfigModule {}
