import { AuthenticationError } from 'apollo-server-express';
import Follower from '..';
import { ContextArgs } from '../../shared/Types';
import { user } from '../../User/utils/auth';

export default async (_: Object, __: Object, context: ContextArgs) => {
  const followee = user.validate(context);
  const followers = await Follower.find({})
    .where({ followee })
    .populate('follower');
  return followers.map((follower) => follower.follower);
};
