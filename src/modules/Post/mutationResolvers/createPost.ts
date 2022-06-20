import { Context } from '../../../shared/Types';
import { newPost } from '../postType';

export default async (_: Object, args: newPost, { models, user }: Context) => {
  const community = await models.Community.findById(args.communityId);
  const commId = community ? args.communityId : null;

  const { id } = await models.Post.create({
    creatorId: user?.id,
    communityId: commId,
    ...args,
  });

  // create posts-stats instance to update later
  await models.PostStats.create({ postId: id })
};
