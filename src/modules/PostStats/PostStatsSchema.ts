import { gql } from "apollo-server-express";

export default gql`
type PostStats {
  id: String!
  postId: String!
  upvotes: Int!
  downvotes: Int!
  commentCount: Int!
}
`
