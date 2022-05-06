import typeDefs from './communitySchema';
import Query from './queryResolvers';
import Mutation from './mutationResolvers';
import Model from './communityModel';
import Community from './communityResolvers';

const resolvers = { Query, Mutation, Community };

export const communitySchema = {
  typeDefs,
  resolvers,
};

export default Model;
