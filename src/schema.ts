import { buildSubgraphSchema } from '@apollo/subgraph';
import { userSchema } from './modules/User';
import { communitySchema } from './modules/Community';
import { followerSchema } from './modules/Follower';
import { joinSchema } from './modules/Join/';

export default buildSubgraphSchema([
  userSchema,
  communitySchema,
  followerSchema,
  joinSchema,
]);
