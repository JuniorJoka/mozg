import Comment from '..';
import { commentArgs } from '../commentType';

export default async (_: Object, args: commentArgs) => {
  const { id } = args;
  return await Comment.find({ parent: { id } });
};
