import Community from '../../Community';
import { PostCommunityArgs } from '../postType';

export default async (parent: PostCommunityArgs) => {
  const { communityId } = parent;
  return await Community.findById(communityId);
};
