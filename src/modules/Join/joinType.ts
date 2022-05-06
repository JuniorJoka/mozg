export interface JoinType {
  _id: string;
  communityId: string;
  memberId: string;
}

export interface JoinArgs {
  communityId: string;
}
