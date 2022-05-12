import CommentType from '../commentType';
import { Context } from '../../../shared/Types';

export default async (args: CommentType, _: {}, { models }: Context) => {
  const { parentId, parentType } = args;
  if (parentType == 'comment') {
    await models.Comment.findById(parentId);
  }
};
