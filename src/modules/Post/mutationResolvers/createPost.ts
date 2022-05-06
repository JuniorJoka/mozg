import { v4 } from 'uuid';
import Post from '..';
import Community from '../../Community';
import { Context } from '../../../shared/Types';
import { user } from '../../User/utils/auth';
import { newPostArgs } from '../postType';

export default async (_: Object, args: newPostArgs, context: Context) => {
  user.validate(context);

  const community = await Community.findById(args.community);
  const comm_id = community ? args.community : null;

  const id = v4();
  await Post.create({
    id,
    creator_id: context.user?.id,
    community_id: comm_id,
    ...args,
  });
};
