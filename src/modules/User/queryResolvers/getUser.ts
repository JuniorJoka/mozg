import { Context } from '../../../shared/Types';
import { GetUserArgs } from '../userType';

export default async (_: {}, args: GetUserArgs, { models }: Context) => {
  const { id, username } = args;

  if (id) return await models.User.findById(id);
  if (username) return await models.User.findOne({ username });
  return null;
};
