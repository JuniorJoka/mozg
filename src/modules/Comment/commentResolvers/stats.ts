import { Context } from '../../../shared/Types'
import CommentType from '../commentType'


export default async ({ _id }: CommentType, _: {}, { models }: Context) => {
  return await models.CommentStats.findOne({ commentId: _id })
}
