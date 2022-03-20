import Post from '..';
import { ContextArgs } from '../../../shared/Types';
import { user } from '../../User/utils/auth';

export default async (_: Object, __: Object, context: ContextArgs) => {
  user.validate(context);

  return await Post.find({ creator: context.user?.id });
};
