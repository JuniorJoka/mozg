import { v4 } from 'uuid';
import Post from '..';
import Community from '../../Community';
import { Context } from '../../../shared/Types';
import { user } from '../../User/utils/auth';
import { newPostArgs } from '../postType';

export default async (_: Object, args: newPostArgs, context: Context) => {
  user.validate(context);

  const community = await Community.findById(args.communityId);
  const commId = community ? args.communityId : null;

  const id = v4();
  await Post.create({
    id,
    creator_id: context.user?.id,
    communityId: commId,
    ...args,
  });
};
