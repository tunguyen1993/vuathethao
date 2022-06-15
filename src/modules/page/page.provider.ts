import { PAGE_REPOSITORY } from "../../core/constants";
import { PageEntity } from "./page.entity";

export const PageProviders = [
  {
    provide: PAGE_REPOSITORY,
    useValue: PageEntity,
  },
];
