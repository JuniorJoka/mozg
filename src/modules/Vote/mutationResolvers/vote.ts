import { Context } from '../../../shared/Types';
import { Vote } from '../voteType';

export default async (_: {}, args: Vote, { models, user }: Context) => {
  const { targetId, targetType, isUpVote } = args;
  const userId = user?.id;

  const hasVoted = await models.Vote.findOne({ userId, targetId })
  if (hasVoted) {
    if (isUpVote !== hasVoted.isUpVote) {
      await models.Vote.findOneAndUpdate({
        userId,
        targetId
      }, { $set: { isUpVote } })
    };
    return
  }

  const vote = await models.Vote.create({
    userId,
    targetType,
    targetId,
    isUpVote,
  });
};
