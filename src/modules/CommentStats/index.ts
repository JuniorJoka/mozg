import model from './CommentStatsModel'
import typeDefs from './CommentStatsSchema'
import commentStats from './commentStatsResolvers'

const resolvers = { commentStats }

export const commentStatsSchema = {
  typeDefs,
  resolvers,
}
export default model
