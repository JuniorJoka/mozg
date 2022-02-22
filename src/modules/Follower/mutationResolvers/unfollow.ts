import { AuthenticationError } from 'apollo-server-express';
import { ContextArgs } from '../../sharedTypes';
import { followArgs } from '../followerType';
import Follower from '..';

export default async (_: Object, args: followArgs, context: ContextArgs) => {
  const { followee } = args;
  const { user } = context;
  if (!user) {
    throw new AuthenticationError(
      'You must be logged in to to perform this action'
    );
  }

  await Follower.findOneAndUpdate(
    { follower: followee, followee: user.id },
    { $set: { reciprocated: false } }
  );
  await Follower.findOneAndRemove({ follower: user.id, followee });
  return true;
};
