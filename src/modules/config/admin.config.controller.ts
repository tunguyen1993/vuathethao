import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ConfigService } from "./config.service";

@Controller("api/v1/admin/config")
export class AdminConfigController {
  constructor(private _configService: ConfigService) {}

  @Get()
  async data() {
    return {
      code: 200,
      data: await this._configService.getConfig(),
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
}
