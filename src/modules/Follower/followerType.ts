export interface followerType {
  _id: string;
  follower: string;
  followee: string;
  reciprocated: boolean;
}

export interface followArgs {
  followee: string;
}

export interface followingArgs {}

export interface followerArgs {}

export interface FollowsMeArgs {
  followee: string;
}
