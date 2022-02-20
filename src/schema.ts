import { buildSubgraphSchema } from '@apollo/subgraph';
import { userSchema } from './modules/User';
import { communitySchema } from './modules/Community';
import { followerSchema } from './modules/Follower';

export default buildSubgraphSchema([
  userSchema,
  communitySchema,
  followerSchema,
]);
