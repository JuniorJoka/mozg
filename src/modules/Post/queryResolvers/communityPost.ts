import Post from '..';
import validate from '../../Join/utils/validate';

import { CommunityPostArgs } from '../postType';

export default async (_: Object, args: CommunityPostArgs) => {
  const { communityId } = args;
  await validate({ communityId: communityId || '' });

  if (communityId) {
    return await Post.find({ communityId });
  }
};
