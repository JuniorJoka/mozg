import { gql } from 'apollo-server-express'

export default gql`
  extend type Mutation {
    vote(targetId: String!, targetType: String!, isUpVote: Boolean!): Boolean
    unvote(targetId: String!): Boolean
  }
`
