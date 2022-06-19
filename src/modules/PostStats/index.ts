import model from './PostStatsModel'
import typeDefs from './PostStatsSchema'
import PostStats from './postStatsResolvers'

const resolvers = { PostStats }
export const postStatsSchema = {
  typeDefs,
  resolvers
}


export default model
