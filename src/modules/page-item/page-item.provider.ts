import {
  PAGE_ITEM_REPOSITORY,
  PAGE_ITEM_FAKE_REPOSITORY,
} from "../../core/constants";
import { PageItemEntity } from "./page-item.entity";
import { PageItemFakeEntity } from "./page-item-fake.entity";

export const PageItemProviders = [
  {
    provide: PAGE_ITEM_REPOSITORY,
    useValue: PageItemEntity,
  },
  {
    provide: PAGE_ITEM_FAKE_REPOSITORY,
    useValue: PageItemFakeEntity,
  },
];
