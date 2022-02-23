import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    join(community: String!): Boolean
    leave(community: String!): Boolean
  }
`;
