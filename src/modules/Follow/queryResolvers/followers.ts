import { Context } from '../../../shared/Types';
import { user } from '../../User/utils/auth';

export default async (_: {}, __: {}, context: Context) => {
  const followeeId = user.validate(context);
  const followers = await context.models.Follow.find({})
    .where({ followeeId })
    .populate('followerId');
  return followers.map((follower) => follower.followerId);
};
