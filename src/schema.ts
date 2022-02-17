import { buildSubgraphSchema } from '@apollo/subgraph';
import { userSchema } from './modules/User';

export default buildSubgraphSchema([userSchema]);
