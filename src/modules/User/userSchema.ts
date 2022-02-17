import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: String
    username: String
    email: String
  }

  extend type Query {
    me: User
    users: [User]
    user(id: ID): User
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): String
    login(username: String, email: String, password: String): String
  }
`;
