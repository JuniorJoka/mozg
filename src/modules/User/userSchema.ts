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
    user(id: ID, username: String): User
  }

  type Auth {
    token: String
    user: User
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): Auth
    login(login: String!, password: String!): Auth
  }
`;
