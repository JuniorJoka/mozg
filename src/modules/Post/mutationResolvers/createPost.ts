import { v4 } from 'uuid';
import Post from '..';
import Community from '../../Community';
import { ContextArgs } from '../../../shared/Types';
import { user } from '../../User/utils/auth';
import { newPostArgs } from '../postType';

export default async (_: Object, args: newPostArgs, context: ContextArgs) => {
  user.validate(context);

  const community = await Community.findById(args.community);
  const comm_id = community ? args.community : null;

  const id = v4();
  await Post.create({
    id,
    creator: context.user?.id,
    community: comm_id,
    ...args,
  });
};
