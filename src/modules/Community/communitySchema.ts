import { gql } from 'apollo-server-express';

export default gql`
  type Community {
    id: String
    communityName: String
    communitydescription: String
    creator: User
    followerCount: Int
  }

  extend type Query {
    communities: [Community]
    community(communityName: String!): Community
  }

  extend type Mutation {
    registerCommunity(communityName: String!, communityDescription: String): ID
  }
`;
