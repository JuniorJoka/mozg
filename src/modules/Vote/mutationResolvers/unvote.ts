import { Context } from '../../../shared/Types'
import { Vote } from '../voteType'


export default async (_: {}, args: Vote, { models, user }: Context) => {
  const { targetId } = args;
  const userId = user?.id;
  await models.Vote.findOneAndRemove({ userId, targetId })
}
