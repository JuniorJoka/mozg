export interface CommunityType {
  _id: string;
  communityName: string;
  communityDescription?: string;
  creatorId: string;
  moderators: String[];
}

export interface GetCommunityArgs {
  communityName: string;
}

export interface registerCommunityArgs {
  communityName: string;
  communityDescription?: string;
}

export interface CommunityCreatorArgs {
  creatorId: string;
}
