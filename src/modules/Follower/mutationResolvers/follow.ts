import { AuthenticationError, ValidationError } from 'apollo-server-express';
import { v4 } from 'uuid';
import Follower from '..';
import { ContextArgs } from '../../sharedTypes';
import User from '../../User';
import { followArgs } from '../followerType';

export default async (_: Object, args: followArgs, context: ContextArgs) => {
  console.log('entered func');
  const { followee } = args;
  const { user } = context;

  // only logged in users can follow others
  if (!user) {
    console.log('no logged in user');
    throw new AuthenticationError(
      'You must be logged in to perform this action'
    );
  }
  // determine followee exist in database
  const followeeExists = await User.findById(followee);

  if (!followeeExists) {
    console.log('followee does not exist');
    throw new ValidationError('No such user exists');
  }

  const id = v4();
  await Follower.create({ id, follower: user.id, followee });
  console.log('done');
  return true;
};
