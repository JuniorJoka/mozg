import CommentType from '../commentType';
import { Context } from '../../../shared/Types';

export default async ({ _id }: CommentType, _: {}, { models }: Context) => {
  await models.Comment.find({ parentId: _id });
};
