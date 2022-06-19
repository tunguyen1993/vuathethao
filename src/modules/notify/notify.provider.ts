import { NOTIFY_REPOSITORY } from "../../core/constants";
import { NotifyEntity } from "./notify.entity";

export const NotifyProviders = [
  {
    provide: NOTIFY_REPOSITORY,
    useValue: NotifyEntity,
  },
];
