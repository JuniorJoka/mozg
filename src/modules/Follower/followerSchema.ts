import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    followers: [User]
    following: [User]
  }

  extend type Mutation {
    follow(followee: String!): Boolean
  }
`;
