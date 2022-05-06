import User from '..';
import { Context } from '../../../shared/Types';

export default async (_: {}, __: {}, context: Context) => {
  const { user } = context;
  if (user) return await User.findById(user.id);
  return null;
};
