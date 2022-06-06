import { Context } from '../../../shared/Types';
import Follow from '../followType';

export default async (_: {}, args: Follow, { models, user }: Context) => {
  const { followeeId } = args;

  await models.Follow.findOneAndUpdate(
    { follower: followeeId, followee: user?.id },
    { $set: { reciprocated: false } }
  );
  await models.Follow.findOneAndRemove({ followerId: user?.id, followeeId });
  return true;
};
