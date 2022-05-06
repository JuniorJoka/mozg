import { Context } from '../../../shared/Types';
import { followArgs } from '../followerType';
import { user } from '../../User/utils/auth';
import Follower from '..';

export default async (_: {}, args: followArgs, context: Context) => {
  const { followee } = args;

  const follower = user.validate(context);

  await Follower.findOneAndUpdate(
    { follower: followee, followee: follower },
    { $set: { reciprocated: false } }
  );
  await Follower.findOneAndRemove({ follower, followee });
  return true;
};
