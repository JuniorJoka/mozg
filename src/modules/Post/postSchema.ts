import { gql } from 'apollo-server-express';

export default gql`
  type Post {
    id: String!
    creatorId: String!
    creator: User!
    postType: String!
    communityId: String
    community: Community
    title: String!
    content: String
    commentCount: Int!
    upVotes: Int!
    downVotes: Int!
  }

  extend type Mutation {
    createPost(
      title: String!
      postType: String!
      content: String
      communityId: ID
    ): Boolean
  }

  extend type Query {
    post(postId: ID!): Post
    posts(creatorId: ID!): [Post]
    communityPost(communityId: ID!): [Post]
    viewerPost: [Post]
  }
`;
