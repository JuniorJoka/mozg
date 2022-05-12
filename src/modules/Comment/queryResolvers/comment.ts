import { Context } from '../../../shared/Types';
import { comment } from '../commentType';

export default async (_: Object, args: comment, { models }: Context) => {
  const { commentId } = args;
  return await models.Comment.findById(commentId);
};
