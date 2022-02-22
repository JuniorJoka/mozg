import { AuthenticationError, ValidationError } from 'apollo-server-express';
import { v4 } from 'uuid';
import Follower from '..';
import { ContextArgs } from '../../shared/Types';
import User from '../../User';
import { followArgs } from '../followerType';

export default async (_: Object, args: followArgs, context: ContextArgs) => {
  const { followee } = args;
  const { user } = context;

  // only logged in users can follow others
  if (!user) {
    throw new AuthenticationError(
      'You must be logged in to perform this action'
    );
  }
  // determine followee exist in database
  const followeeExists = await User.findById(followee);

  if (!followeeExists) {
    throw new ValidationError('No such user exists');
  }

  // prevent duplicate relationship
  const relationshipExists = await Follower.findOne({
    follower: user.id,
    followee,
  });

  if (relationshipExists) return true;

  const id = v4();
  const followsBack = await Follower.findOneAndUpdate(
    {
      followee: user.id,
      follower: followee,
    },
    { $set: { reciprocated: true } }
  );
  let reciprocated = false;
  if (followsBack) reciprocated = true;
  const newFollow = await Follower.create({
    id,
    follower: user.id,
    followee,
    reciprocated,
  });
  await newFollow.save();

  return true;
};
