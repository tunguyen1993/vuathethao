import {
  CATEGORY_ITEM_REPOSITORY,
  POST_REPOSITORY,
  POST_FAKE_REPOSITORY,
  CATEGORY_ITEM_FAKE_REPOSITORY,
} from "../../core/constants";
import { PostEntity } from "./post.entity";
import { CategoryItemEntity } from "../category-item/category-item.entity";
import { PostFakeEntity } from "./post-fake.entity";
import { CategoryItemFakeEntity } from "../category-item/category-item-fake.entity";

export const PostProviders = [
  {
    provide: POST_REPOSITORY,
    useValue: PostEntity,
  },
  {
    provide: POST_FAKE_REPOSITORY,
    useValue: PostFakeEntity,
  },
  {
    provide: CATEGORY_ITEM_REPOSITORY,
    useValue: CategoryItemEntity,
  },
  {
    provide: CATEGORY_ITEM_FAKE_REPOSITORY,
    useValue: CategoryItemFakeEntity,
  },
];
