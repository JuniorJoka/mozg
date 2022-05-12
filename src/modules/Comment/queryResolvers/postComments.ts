import CommentType from '../commentType';
import { Context } from '../../../shared/Types';

export default async (_: Object, args: CommentType, { models }: Context) => {
  const { postId } = args;
  return await models.Comment.find({ postId });
};
