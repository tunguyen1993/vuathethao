import { PAGE_ITEM_REPOSITORY } from "../../core/constants";
import { PageItemEntity } from "./page-item.entity";

export const PageItemProviders = [
  {
    provide: PAGE_ITEM_REPOSITORY,
    useValue: PageItemEntity,
  },
];
