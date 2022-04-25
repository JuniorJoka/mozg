import User from '../userModel';

export default async () => {
  return await User.find({});
};
