import { Context } from '../../../shared/Types';
import Post from '../postType';

export default async (_: Object, { _id }: Post, { models }: Context) => {
  return await models.Post.findById(_id);
};
