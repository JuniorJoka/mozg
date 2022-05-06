import { Context } from '../../../shared/Types';

export default async (_: {}, __: {}, context: Context) => {
  const { user, models } = context;
  if (user) return await models.User.findById(user.id);
  return null;
};
