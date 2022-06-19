import typeDefs from './voteSchema'
import Mutation from './mutationResolvers'
import Vote from './voteModel'

const resolvers = { Mutation }

export const voteSchema = {
  typeDefs,
  resolvers
}

export default Vote;
