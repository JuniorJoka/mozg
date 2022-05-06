import Post from '..';
import { Context } from '../../../shared/Types';
import { user } from '../../User/utils/auth';

export default async (_: {}, __: {}, context: Context) => {
  user.validate(context);

  return await Post.find({ creator: context.user?.id });
};
