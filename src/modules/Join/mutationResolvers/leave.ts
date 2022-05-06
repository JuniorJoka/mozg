import Join from '..';
import { Context } from '../../../shared/Types';
import { user } from '../../User/utils/auth';
import { JoinArgs } from '../joinType';
import validate from '../utils/validate';

export default async (_: {}, args: JoinArgs, context: Context) => {
  await validate(args);
  user.validate(context);
  const { communityId } = args;

  if (!context.user) {
    throw Error('Invalid user');
  }

  await Join.findOneAndRemove({ communityId, memberId: context.user.id });
};
