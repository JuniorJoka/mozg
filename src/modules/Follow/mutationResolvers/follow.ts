import { ValidationError } from 'apollo-server-express';
import { Context } from '../../../shared/Types';
import User from '../../User';
import Follow from '../followType';

export default async (_: {}, args: Follow, { user, models }: Context) => {
  const { followeeId } = args;

  //  TODO: Validate for only logged users

  // determine followee exist in database
  const followeeExists = await User.findById(followeeId);

  if (!followeeExists) {
    throw new ValidationError('No such user exists');
  }

  // prevent duplicate relationship
  const relationshipExists = await models.Follow.findOne({
    followerId: user?.id,
    followeeId,
  });

  if (relationshipExists) return true;

  const followsBack = await models.Follow.findOneAndUpdate(
    {
      followee: user?.id,
      follower: followeeId,
    },
    { $set: { reciprocated: true } }
  );
  let reciprocated = false;
  if (followsBack) reciprocated = true;
  const newFollow = await models.Follow.create({
    followerId: user?.id,
    followeeId,
    reciprocated,
  });
  await newFollow.save();

  return true;
};
