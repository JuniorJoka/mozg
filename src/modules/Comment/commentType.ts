export interface CommentType {
  _id: string;
  postId: string;
  parent: {
    id: string;
    title: string;
    type: string;
  };
  comment: string;
  commentor: {
    id: string;
    name: string;
  };
}

export interface commentArgs {
  id: string;
}

export interface newCommentArgs {
  parent: string;
  type: string;
  comment: string;
  postId: string;
  commentor: string;
}

export interface postCommentArgs {
  id: string;
}

export interface CommentReplyArgs {
  id: string;
  postId: string;
}

export interface newComment extends newCommentArgs {
  title: string;
  id: string;
  username: string;
}
