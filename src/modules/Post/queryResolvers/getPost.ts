import Post from '..';
import { PostArgs } from '../postType';

export default async (_: Object, args: PostArgs) => {
  const { id } = args;

  if (id) return await Post.findById(id);
  return await Post.find({});
};
