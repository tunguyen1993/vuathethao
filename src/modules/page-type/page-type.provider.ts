import {
  PAGE_TYPE_REPOSITORY,
  PAGE_TYPE_FAKE_REPOSITORY,
} from "../../core/constants";
import { PageTypeEntity } from "./page-type.entity";
import { PageTypeFakeEntity } from "./page-type-fake.entity";

export const PageTypeProviders = [
  {
    provide: PAGE_TYPE_REPOSITORY,
    useValue: PageTypeEntity,
  },
  {
    provide: PAGE_TYPE_FAKE_REPOSITORY,
    useValue: PageTypeFakeEntity,
  },
];
