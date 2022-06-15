import { CONFIG_REPOSITORY } from "../../core/constants";
import { ConfigEntity } from "./config.entity";

export const ConfigProviders = [
  {
    provide: CONFIG_REPOSITORY,
    useValue: ConfigEntity,
  },
];
