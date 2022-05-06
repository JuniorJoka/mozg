import { AuthenticationError, ValidationError } from 'apollo-server-express';
import { v4 } from 'uuid';
import Follower from '..';
import { Context } from '../../../shared/Types';
import User from '../../User';
import { user } from '../../User/utils/auth';
import { followArgs } from '../followerType';

export default async (_: {}, args: followArgs, context: Context) => {
  const { followee } = args;

  // only logged in users can follow others
  const follower = user.validate(context);

  // determine followee exist in database
  const followeeExists = await User.findById(followee);

  if (!followeeExists) {
    throw new ValidationError('No such user exists');
  }

  // prevent duplicate relationship
  const relationshipExists = await Follower.findOne({
    follower,
    followee,
  });

  if (relationshipExists) return true;

  const id = v4();
  const followsBack = await Follower.findOneAndUpdate(
    {
      followee: follower,
      follower: followee,
    },
    { $set: { reciprocated: true } }
  );
  let reciprocated = false;
  if (followsBack) reciprocated = true;
  const newFollow = await Follower.create({
    id,
    follower,
    followee,
    reciprocated,
  });
  await newFollow.save();

  return true;
};
