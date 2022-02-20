import Community from '../communityModel';
import { GetCommunityArgs } from '../communityType';

export default async (_: Object, args: GetCommunityArgs) => {
  const { id } = args;
  if (id) {
    return await Community.findById(id);
  }

  return await Community.find({});
};
