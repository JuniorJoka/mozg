import Follower from '..';
import { Context } from '../../../shared/Types';
import { user } from '../../User/utils/auth';

export default async (_: {}, __: {}, context: Context) => {
  const followee = user.validate(context);
  const followers = await Follower.find({})
    .where({ followee })
    .populate('follower');
  return followers.map((follower) => follower.follower);
};
