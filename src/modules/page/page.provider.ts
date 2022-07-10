import { PAGE_REPOSITORY, PAGE_FAKE_REPOSITORY } from "../../core/constants";
import { PageEntity } from "./page.entity";
import { PageFakeEntity } from "./page-fake.entity";

export const PageProviders = [
  {
    provide: PAGE_REPOSITORY,
    useValue: PageEntity,
  },
  {
    provide: PAGE_FAKE_REPOSITORY,
    useValue: PageFakeEntity,
  },
];
