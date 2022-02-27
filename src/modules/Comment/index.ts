import typeDefs from './commentSchema';
import Query from './queryResolvers';
import Mutation from './mutationResolvers';
import Comment from './commentModel';

const resolvers = { Query, Mutation };

export const commentSchema = {
  typeDefs,
  resolvers,
};

export default Comment;
