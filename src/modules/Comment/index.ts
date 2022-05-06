import typeDefs from './commentSchema';
import Query from './queryResolvers';
import Mutation from './mutationResolvers';
import Model from './commentModel';
import Comment from './commentResolvers';

const resolvers = { Query, Mutation, Comment };

export const commentSchema = {
  typeDefs,
  resolvers,
};

export default Model;
