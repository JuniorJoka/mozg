import Community from '../communityModel';
import { GetCommunityArgs } from '../communityType';

export default async (_: Object, args: GetCommunityArgs) => {
  const { communityName } = args;
  if (!communityName) return await Community.find({});

  return await Community.findOne({ communityName });
};
