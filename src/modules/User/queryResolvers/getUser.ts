import User from '../userModel';
import { GetUserArgs } from '../userType';

export default async (_: Object, args: GetUserArgs) => {
  const { id, username } = args;

  if (id) return await User.findById(id);
  if (username) return await User.findOne({ username });
  return null;
};
