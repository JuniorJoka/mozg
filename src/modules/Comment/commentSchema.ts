import { gql } from 'apollo-server-express';

export default gql`
  type Comment {
    id: String!
    parentId: String!
    parentType: String!
    postId: String!
    comment: String!
    commentor: User!
    replies: [Comment]
    stats: CommmentStats!
  }

  extend type Query {
    comment(commentId: String!): Comment
    postComments(postId: String!): [Comment]
  }

  extend type Mutation {
    newComment(
      parentId: String!
      parentType: String!
      comment: String!
      postId: String!
    ): Boolean
  }
`;
