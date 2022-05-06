import Post from '..';
import { PostsArgs } from '../postType';

export default async (_: Object, args: PostsArgs) => {
  const { creatorId } = args;

  return await Post.find({ creatorId });
};
