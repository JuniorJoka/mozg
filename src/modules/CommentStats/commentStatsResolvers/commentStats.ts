import { Context } from '../../../shared/Types'
import CommentStats from '../CommentStatsType'


export default async (_: {}, { commentId }: CommentStats, { models }: Context) => {
  return await models.CommentStats.findOne({ commentId })
}
