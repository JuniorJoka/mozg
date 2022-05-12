import { Context } from '../../../shared/Types';

// retrieve and return posts of logged in user
export default async (_: {}, __: {}, { user, models }: Context) => {
  return await models.Post.find({ creatorId: user?.id });
};
