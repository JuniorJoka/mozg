import Follower from './followerModel';
import typeDefs from './followerSchema';
import Query from './queryResolvers';
import Mutation from './mutationResolvers';

const resolvers = { Query, Mutation };

export const followerSchema = {
  typeDefs,
  resolvers,
};

export default Follower;
