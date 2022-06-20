import { Context } from '../../../shared/Types';
import { Vote } from '../voteType';

export default async (_: {}, args: Vote, { models, user }: Context) => {
  const { targetId, targetType, isUpvote } = args;
  const userId = user?.id;
  const postId = targetId
  const commentId = targetId

  const hasVoted = await models.Vote.findOne({ userId, targetId })
  if (hasVoted) {
    if (isUpvote !== hasVoted.isUpvote) {
      await models.Vote.findOneAndUpdate({
        userId,
        targetId
      }, { $set: { isUpvote } })

      if (targetType === 'post') {
        if (isUpvote) {
          await models.PostStats.findOneAndUpdate({ postId }, { $inc: { upvotes: 1 } })
          await models.PostStats.findOneAndUpdate({ postId }, { $inc: { downvotes: -1 } })
        } else {
          await models.PostStats.findOneAndUpdate({ postId }, { $inc: { downvotes: 1 } })
          await models.PostStats.findOneAndUpdate({ postId }, { $inc: { upvotes: -1 } })
        }
      } else {
        if (isUpvote) {
          await models.CommentStats.findOneAndUpdate({ commentId }, { $inc: { upvotes: 1 } })
          await models.CommentStats.findOneAndUpdate({ commentId }, { $inc: { downvotes: -1 } })
        } else {
          await models.CommentStats.findOneAndUpdate({ commentId }, { $inc: { downvotes: 1 } })
          await models.CommentStats.findOneAndUpdate({ commentId }, { $inc: { upvotes: -1 } })
        }
      }
    };
    return
  }

  //  create vote instance
  await models.Vote.create({
    userId,
    targetType,
    targetId,
    isUpvote,
  });


  if (targetType === 'post') {
    if (isUpvote) {
      await models.PostStats.findOneAndUpdate({ postId }, { $inc: { upvotes: 1 } })
    } else {
      await models.PostStats.findOneAndUpdate({ postId }, { $inc: { downvotes: 1 } })
    }
  } else {
    if (isUpvote) {
      await models.CommentStats.findOneAndUpdate({ commentId }, { $inc: { upvotes: 1 } })
    } else {
      await models.CommentStats.findOneAndUpdate({ commentId }, { $inc: { downvotes: 1 } })
    }
  }
};
