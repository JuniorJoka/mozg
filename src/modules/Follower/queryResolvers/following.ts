import Follower from '..';
import { ContextArgs } from '../../shared/Types';
import { user } from '../../User/utils/auth';

export default async (_: Object, __: Object, context: ContextArgs) => {
  const follower = user.validate(context);
  const followings = await Follower.find({})
    .where({ follower })
    .populate('followee');
  return followings.map((following) => following.followee);
};
