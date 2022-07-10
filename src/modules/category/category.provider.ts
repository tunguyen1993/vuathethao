import {
  CATEGORY_REPOSITORY,
  CATEGORY_FAKE_REPOSITORY,
} from "../../core/constants";
import { CategoryEntity } from "./category.entity";
import { CategoryFakeEntity } from "./category-fake.entity";

export const CategoryProviders = [
  {
    provide: CATEGORY_REPOSITORY,
    useValue: CategoryEntity,
  },
  {
    provide: CATEGORY_FAKE_REPOSITORY,
    useValue: CategoryFakeEntity,
  },
];
