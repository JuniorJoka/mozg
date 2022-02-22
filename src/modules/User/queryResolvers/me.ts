import User from '..';
import { ContextArgs } from '../../shared/Types';

export default async (_: Object, __: Object, context: ContextArgs) => {
  const { user } = context;
  if (user) return await User.findById(user.id);
  return null;
};
