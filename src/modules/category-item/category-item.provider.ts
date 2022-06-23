import {
  CATEGORY_ITEM_REPOSITORY,
  PAGE_TYPE_REPOSITORY,
} from "../../core/constants";
import { CategoryItemEntity } from "./category-item.entity";
import { PageTypeEntity } from "../page-type/page-type.entity";

export const CategoryItemProviders = [
  {
    provide: CATEGORY_ITEM_REPOSITORY,
    useValue: CategoryItemEntity,
  },
  {
    provide: PAGE_TYPE_REPOSITORY,
    useValue: PageTypeEntity,
  },
];
