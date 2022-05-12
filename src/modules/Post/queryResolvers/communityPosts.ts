import { Context } from '../../../shared/Types';
import Post from '../postType';

export default async (_: {}, { communityId }: Post, { models }: Context) => {
  return await models.Post.find({ communityId });
};
