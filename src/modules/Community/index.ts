import typeDefs from './communitySchema';
import Query from './queryResolvers';
import Mutation from './mutationResolvers';
import Community from './communityModel';

const resolvers = { Query, Mutation };

export const communitySchema = {
  typeDefs,
  resolvers,
};

export default Community;
