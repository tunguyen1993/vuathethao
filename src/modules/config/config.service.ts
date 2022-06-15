import { Controller, Inject, Injectable } from "@nestjs/common";
import { CONFIG_REPOSITORY, PAGE_REPOSITORY } from "../../core/constants";
import { ConfigEntity } from "./config.entity";

@Injectable()
export class ConfigService {
  constructor(
    @Inject(CONFIG_REPOSITORY)
    private readonly configRepository: typeof ConfigEntity,
  ) {}

  async getConfig() {
    return await this.configRepository.findAll({});
  }
}
