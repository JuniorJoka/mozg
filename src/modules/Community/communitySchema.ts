import { gql } from 'apollo-server-express';

export default gql`
  type Community {
    id: String
    name: String
    creator: User
    followerCount: Int
  }

  extend type Query {
    communities: [Community]
    community(id: ID): Community
  }

  extend type Mutation {
    registerCommunity(name: String!, description: String): ID
  }
`;
