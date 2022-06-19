export default interface PostStats {
  _id: string;
  postId: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
}
