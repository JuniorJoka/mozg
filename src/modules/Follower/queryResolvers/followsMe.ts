import { AuthenticationError } from 'apollo-server-express';
import Follower from '..';
import { ContextArgs } from '../../shared/Types';
import { FollowsMeArgs } from '../followerType';

export default async ({}, args: FollowsMeArgs, context: ContextArgs) => {
  const { followee } = args;
  const { user } = context;

  if (!user) {
    throw new AuthenticationError(
      'You must be logged in to perform this action'
    );
  }

  const foundRelation = await Follower.findOne({
    followee: user.id,
    follower: followee,
  });

  if (!foundRelation) return false;
  return true;
};
