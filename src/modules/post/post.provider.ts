import {
  AGENCY_REPOSITORY,
  CATEGORY_ITEM_REPOSITORY,
  DEALS_REPOSITORY,
  GAME_CARD_REPOSITORY,
  GAME_MOBILE_REPOSITORY,
  POST_REPOSITORY,
} from "../../core/constants";
import { PostEntity } from "./post.entity";
import { CategoryItemEntity } from "../category-item/category-item.entity";

export const PostProviders = [
  {
    provide: POST_REPOSITORY,
    useValue: PostEntity,
  },
  {
    provide: CATEGORY_ITEM_REPOSITORY,
    useValue: CategoryItemEntity,
  },
];
