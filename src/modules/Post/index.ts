import typeDefs from './postSchema';
import Query from './queryResolvers';
import Mutation from './mutationResolvers';
import Post from './postModel';

const resolvers = { Query, Mutation };

export const postSchema = {
  typeDefs,
  resolvers,
};

export default Post;
