import { gql } from 'apollo-server-express'

export default gql`
  type CommmentStats {
    id: String!
    commentId: String!
    upvotes: Int!
    downVotes: Int!
}
`
