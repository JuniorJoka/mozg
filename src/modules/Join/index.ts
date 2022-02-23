import typeDefs from './joinSchema';
import Mutation from './mutationResolvers';
import Join from './joinModel';

const resolvers = { Mutation };

export const joinSchema = {
  typeDefs,
  resolvers,
};

export default Join;
