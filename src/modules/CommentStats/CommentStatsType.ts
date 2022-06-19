export default interface CommentStats {
  _id: string;
  commentId: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
}
