import { gql } from 'apollo-server-express';

export default gql`
  type CommentParent {
    id: String!
    title: String!
    type: String!
  }
  type Comment {
    id: String!
    parent: CommentParent!
    comment: String!
  }

  extend type Query {
    comments(id: String!): [Comment]
  }

  extend type Mutation {
    newComment(
      parent: String!
      type: String!
      comment: String!
      commentor: String!
      post: String!
    ): Boolean
  }
`;
