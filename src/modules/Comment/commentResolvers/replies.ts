import Comment from '..';
import { CommentReplyArgs } from '../commentType';

export default async (parent: CommentReplyArgs) => {
  const { id } = parent;
  return await Comment.find({ 'parent.id': id });
};
