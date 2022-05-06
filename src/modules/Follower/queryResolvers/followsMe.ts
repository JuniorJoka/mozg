import Follower from '..';
import { Context } from '../../../shared/Types';
import { FollowsMeArgs } from '../followerType';
import { user } from '../../User/utils/auth';

export default async ({}, args: FollowsMeArgs, context: Context) => {
  const { followee } = args;

  const user_id = user.validate(context);
  const foundRelation = await Follower.findOne({
    followee: user_id,
    follower: followee,
  });

  if (!foundRelation) return false;
  return true;
};
