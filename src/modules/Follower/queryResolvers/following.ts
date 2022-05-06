import Follower from '..';
import { Context } from '../../../shared/Types';
import { user } from '../../User/utils/auth';

export default async (_: {}, __: {}, context: Context) => {
  const follower = user.validate(context);
  const followings = await Follower.find({})
    .where({ follower })
    .populate('followee');
  return followings.map((following) => following.followee);
};
