import typeDefs from './userSchema';
import Query from './queryResolvers';
import Mutation from './mutationResolvers';
import User from './userModel';

const resolvers = { Query, Mutation };

export const userSchema = {
  typeDefs,
  resolvers,
};

export default User;
