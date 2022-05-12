import CommentType from '../commentType';
import { Context } from '../../../shared/Types';

export default async ({ postId }: CommentType, _: {}, { models }: Context) => {
  await models.Post.findById({ postId });
};
