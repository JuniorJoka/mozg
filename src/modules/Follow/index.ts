import Model from './followModel';
import typeDefs from './followSchema';
import Query from './queryResolvers';
import Mutation from './mutationResolvers';

const resolvers = { Query, Mutation };

export const followSchema = {
  typeDefs,
  resolvers,
};

export default Model;
