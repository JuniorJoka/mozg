export default interface PostType {
  _id: string;
  creatorId: string;
  postType: string;
  communityId: String;
  title: string;
  content: string;
}

export interface newPost {
  title: string;
  postType: string;
  content?: string;
  communityId?: string;
}
