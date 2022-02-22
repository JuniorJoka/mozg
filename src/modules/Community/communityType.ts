export interface CommunityType {
  _id: string;
  name: string;
  description?: string;
  creator: string;
  moderators: String[];
}

export interface GetCommunityArgs {
  id?: string;
}

export interface registerCommunityArgs {
  name: string;
  description?: string;
}
