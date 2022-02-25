export interface PostType {
  _id: string;
  title: string;
  content: string;
  type: string;
}

export interface CommunityPostArgs {
  community?: string;
}

export interface PostArgs {
  id?: string;
}

export interface newPostArgs {
  title: string;
  type: string;
  content?: string;
  community?: string;
}
