import Post from '..';
import { PostArgs } from '../postType';

export default async (_: Object, args: PostArgs) => {
  const { postId } = args;

  if (postId) return await Post.findById(postId);
  return await Post.find({});
};
