import { buildSubgraphSchema } from '@apollo/subgraph';
import { userSchema } from './modules/User';
import { communitySchema } from './modules/Community';
import { followSchema } from './modules/Follow';
import { joinSchema } from './modules/Join/';
import { postSchema } from './modules/Post';
import { commentSchema } from './modules/Comment';

export default buildSubgraphSchema([
  userSchema,
  communitySchema,
  followSchema,
  joinSchema,
  postSchema,
  commentSchema,
]);
