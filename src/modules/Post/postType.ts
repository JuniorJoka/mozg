export interface PostType {
  _id: string;
  title: string;
  content: string;
  type: string;
}

export interface CommunityPostArgs {
  communityId?: string;
}

export interface ViewPostArgs {
  viewer?: string;
}

export interface PostArgs {
  postId?: string;
}

export interface newPostArgs {
  title: string;
  postType: string;
  content?: string;
  communityId?: string;
}

export interface PostsArgs {
  creatorId: string;
}

export interface PostCreatorArgs {
  creatorId: string;
}

export interface PostCommunityArgs {
  communityId: string;
}
