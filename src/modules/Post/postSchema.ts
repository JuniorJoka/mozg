import { gql } from 'apollo-server-express';

export default gql`
  type Post {
    id: String!
    creator: String!
    type: String!
    community: String
    title: String!
    content: String
  }

  extend type Mutation {
    createPost(
      title: String!
      type: String!
      content: String
      community: String
    ): Boolean
  }

  extend type Query {
    post(id: String!): Post
    posts: [Post]
  }
`;
