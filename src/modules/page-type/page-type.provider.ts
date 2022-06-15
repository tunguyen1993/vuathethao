import { PAGE_TYPE_REPOSITORY } from "../../core/constants";
import { PageTypeEntity } from "./page-type.entity";

export const PageTypeProviders = [
  {
    provide: PAGE_TYPE_REPOSITORY,
    useValue: PageTypeEntity,
  },
];
