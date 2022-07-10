import {
  CATEGORY_ITEM_FAKE_REPOSITORY,
  CATEGORY_ITEM_REPOSITORY,
  PAGE_TYPE_FAKE_REPOSITORY,
  PAGE_TYPE_REPOSITORY,
} from "../../core/constants";
import { CategoryItemEntity } from "./category-item.entity";
import { PageTypeEntity } from "../page-type/page-type.entity";
import { CategoryItemFakeEntity } from "./category-item-fake.entity";
import { PageTypeFakeEntity } from "../page-type/page-type-fake.entity";

export const CategoryItemProviders = [
  {
    provide: CATEGORY_ITEM_REPOSITORY,
    useValue: CategoryItemEntity,
  },
  {
    provide: PAGE_TYPE_REPOSITORY,
    useValue: PageTypeEntity,
  },
  {
    provide: CATEGORY_ITEM_FAKE_REPOSITORY,
    useValue: CategoryItemFakeEntity,
  },
  {
    provide: PAGE_TYPE_FAKE_REPOSITORY,
    useValue: PageTypeFakeEntity,
  },
];
