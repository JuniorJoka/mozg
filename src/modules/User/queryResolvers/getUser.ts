import User from '../userModel';
import { GetUserArgs } from '../userType';

export default async (_: Object, args: GetUserArgs) => {
  const { id } = args;
  if (id) {
    return await User.findById(id);
  }

  return await User.find({});
};
