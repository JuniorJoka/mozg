import { Context } from '../../../shared/Types'
import { Vote } from '../voteType'


export default async (_: {}, args: Vote, { models, user }: Context) => {
  const { targetId } = args;
  const userId = user?.id;
  const postId = targetId
  const commentId = targetId

  const vote = await models.Vote.findOneAndRemove({ userId, targetId })

  if (!vote) {
    return
  }
  const { isUpVote, targetType } = vote

  if (isUpVote) {
    if (targetType === 'post') {
      await models.PostStats.findOneAndUpdate({ postId }, { $inc: { upvotes: -1 } })
    } else {
      await models.CommentStats.findOneAndUpdate({ commentId }, { inc: { upvotes: -1 } })
    }
  } else {
    if (targetType === 'post') {
      await models.PostStats.findOneAndUpdate({ postId }, { $inc: { downvotes: -1 } })
    } else {
      await models.CommentStats.findOneAndUpdate({ commentId }, { inc: { downvotes: -1 } })
    }

  }
}
