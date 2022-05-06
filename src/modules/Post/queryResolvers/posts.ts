import Post from '..';
import { PostsArgs } from '../postType';

export default async (_: Object, args: PostsArgs) => {
  const { creator } = args;

  return await Post.find({ creator_id: creator });
};
