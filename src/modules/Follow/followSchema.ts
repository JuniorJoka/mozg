import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    followers: [User]
    following: [User]
    followsMe: Boolean
  }

  extend type Mutation {
    follow(followee: String!): Boolean
    unfollow(followee: String!): Boolean
  }
`;
