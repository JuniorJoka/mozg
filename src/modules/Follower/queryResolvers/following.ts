import { AuthenticationError } from 'apollo-server-express';
import Follower from '..';
import { ContextArgs } from '../../shared/Types';
import { followingArgs } from '../followerType';

export default async (_: Object, args: followingArgs, context: ContextArgs) => {
  const { user } = context;
  if (!user) {
    throw new AuthenticationError(
      'You must be logged in to perform this action'
    );
  }
  const followings = await Follower.find({})
    .where({ follower: user.id })
    .populate('followee');
  return followings.map((following) => following.followee);
};
