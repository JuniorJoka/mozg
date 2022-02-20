import { buildSubgraphSchema } from '@apollo/subgraph';
import { userSchema } from './modules/User';
import { communitySchema } from './modules/Community';

export default buildSubgraphSchema([userSchema, communitySchema]);
