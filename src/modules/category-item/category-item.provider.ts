import { CATEGORY_ITEM_REPOSITORY } from "../../core/constants";
import { CategoryItemEntity } from "./category-item.entity";

export const CategoryItemProviders = [
  {
    provide: CATEGORY_ITEM_REPOSITORY,
    useValue: CategoryItemEntity,
  },
];
