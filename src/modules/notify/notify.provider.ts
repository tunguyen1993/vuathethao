import { NOTIFY_REPOSITORY, POST_REPOSITORY } from "../../core/constants";
import { NotifyEntity } from "./notify.entity";
import { PostEntity } from "../post/post.entity";

export const NotifyProviders = [
  {
    provide: NOTIFY_REPOSITORY,
    useValue: NotifyEntity,
  },
  {
    provide: POST_REPOSITORY,
    useValue: PostEntity,
  },
];
