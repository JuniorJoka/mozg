import CommentType from '../commentType';
import { Context } from '../../../shared/Types';

export default async (args: CommentType, _: {}, { models }: Context) => {
  return await models.Comment.find({ parentId: args._id });
};
