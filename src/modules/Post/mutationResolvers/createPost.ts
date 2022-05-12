import { Context } from '../../../shared/Types';
import { newPost } from '../postType';

export default async (_: Object, args: newPost, { models, user }: Context) => {
  const community = await models.Community.findById(args.communityId);
  const commId = community ? args.communityId : null;

  await models.Post.create({
    creatorId: user?.id,
    communityId: commId,
    ...args,
  });
};
