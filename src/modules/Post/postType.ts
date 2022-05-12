export default interface PostType {
  _id: string;
  creatorId: string;
  postType: string;
  communityId: String;
  title: string;
  content: string;
  commentCount: number;
  upVotes: number;
  downVotes: number;
}

export interface newPost {
  title: string;
  postType: string;
  content?: string;
  communityId?: string;
}
