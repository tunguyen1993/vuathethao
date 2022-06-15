import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "./config.service";

@Controller("api/v1/config")
export class ConfigController {
  constructor(private _configService: ConfigService) {}

  @Get()
  async data() {
    return {
      code: 200,
      data: await this._configService.getConfig(),
      error: null,
    };
  }
}
