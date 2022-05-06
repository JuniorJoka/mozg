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
    replies: [Comment]
    commentCount: Int!
    upVotes: Int!
    downVotes: Int!
  }

  extend type Query {
    comments(id: String!): [Comment]
    postComments(PostId: String!): [Comment]
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
