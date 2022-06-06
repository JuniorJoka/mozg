import { Context } from '../../../shared/Types';
import { user } from '../../User/utils/auth';

export default async (_: {}, __: {}, context: Context) => {
  const followerId = user.validate(context);
  const followings = await context.models.Follow.find({})
    .where({ followerId })
    .populate('followee');
  return followings.map(
    (following: { followeeId: any }) => following.followeeId
  );
};
