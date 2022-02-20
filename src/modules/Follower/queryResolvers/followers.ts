import { AuthenticationError } from 'apollo-server-express';
import Follower from '..';
import { ContextArgs } from '../../sharedTypes';
import { followerArgs } from '../followerType';

export default async (_: Object, args: followerArgs, context: ContextArgs) => {
  console.log('called');
  const { user } = context;
  if (!user) {
    throw new AuthenticationError(
      'You must be logged in to perform this action'
    );
  }
  const followers = await Follower.find({})
    .where({ followee: user.id })
    .populate('follower');
  return followers.map((follower) => follower.follower);
};
