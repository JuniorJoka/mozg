import { Context } from '../../../shared/Types';
import PostType from '../postType';

export default async ({ _id }: PostType, _: {}, { models }: Context) => {
  return await models.PostStats.findOne({ postId: _id });
};
