import { Context } from '../../../shared/Types';
import Post from '../postType';

export default async (_: {}, { creatorId }: Post, { models }: Context) => {
  return await models.Post.find({ creatorId });
};
