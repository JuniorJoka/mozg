import CommentType from '../commentType';
import { Context } from '../../../shared/Types';

export default async (args: CommentType, _: {}, { models }: Context) => {
  const { commentorId } = args;
  await models.User.findById(commentorId);
};
