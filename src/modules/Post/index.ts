import typeDefs from './postSchema';
import Query from './queryResolvers';
import Mutation from './mutationResolvers';
import Model from './postModel';
import Post from './postResolvers';

const resolvers = { Query, Mutation, Post };

export const postSchema = {
  typeDefs,
  resolvers,
};

export default Model;
