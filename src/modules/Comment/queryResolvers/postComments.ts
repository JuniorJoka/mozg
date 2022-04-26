import Comment from '..';
import { postCommentArgs } from '../commentType';

export default async (_: Object, args: postCommentArgs) => {
  const { id } = args;
  return await Comment.find({ 'parent.id': id });
};
