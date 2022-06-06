import { Context } from '../../../shared/Types';
import Follow from '../followType';

export default async ({}, args: Follow, { models, user }: Context) => {
  const { followeeId } = args;
  const foundRelation = await models.Follow.findOne({
    followee: user?.id,
    follower: followeeId,
  });

  if (!foundRelation) return false;
  return true;
};
