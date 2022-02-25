import Post from '..';
import validate from '../../Join/utils/validate';

import { CommunityPostArgs } from '../postType';

export default async (_: Object, args: CommunityPostArgs) => {
  const { community } = args;
  await validate({ community: community || '' });

  if (community) {
    return await Post.find({ community });
  }
};
