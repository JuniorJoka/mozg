export default interface CommentType {
  _id: string;
  postId: string;
  parentId: string;
  parentType: string;
  comment: string;
  commentorId: string;
  isDeleted: boolean;
}

export interface comment {
  commentId: string;
}

export interface newComment extends Omit<CommentType, '_id'> { }
