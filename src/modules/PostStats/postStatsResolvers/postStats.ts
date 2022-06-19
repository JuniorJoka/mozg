import PostStats from "../PostStatsType";
import { Context } from "../../../shared/Types"

export default async (_: {}, { postId }: PostStats, { models }: Context) => {
  return await models.PostStats.findOne({ postId })
}
