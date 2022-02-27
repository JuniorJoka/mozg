export interface CommentType {
  _id: string;
  post: string;
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
  post: string;
  commentor: string;
}
