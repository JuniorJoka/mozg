export interface followerType {
  _id: string;
  follower: string;
  followee: string;
}

export interface followArgs {
  followee: string;
}

export interface followingArgs {}

export interface followerArgs {}
