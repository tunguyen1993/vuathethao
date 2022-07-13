import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Param,
  Put,
} from "@nestjs/common";
import { ConfigService } from "./config.service";

@Controller("api/v1/admin/config")
export class AdminConfigController {
  constructor(
    private _configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager,
  ) {}

  @Get()
  async data() {
    return {
      code: 200,
      data: await this._configService.getConfig(),
      error: null,
    };
  }

  @Put("fake-data")
  async update() {
    let fake_data = await this.cacheManager.get("FAKE_DATA");
    await this.cacheManager.set("FAKE_DATA", !fake_data, { ttl: 0 });
    return {
      code: 200,
      data: await this.cacheManager.get("FAKE_DATA"),
      error: null,
    };
  }

  @Put(":id")
  async updateData(@Param("id") id: number, @Body() body) {
    return {
      code: 200,
      data: await this._configService.updateConfig(id, body),
      error: null,
    };
  }

  @Get("fake-data")
  async fakeData() {
    return {
      code: 200,
      data: await this.cacheManager.get("FAKE_DATA"),
      error: null,
    };
  }
}
