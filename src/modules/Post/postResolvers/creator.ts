import { Context } from '../../../shared/Types';
import Post from '../postType';

export default async ({ creatorId }: Post, _: {}, { models }: Context) => {
  return await models.User.findById(creatorId);
};
