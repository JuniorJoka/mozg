import Join from '..';
import { ContextArgs } from '../../../shared/Types';
import { user } from '../../User/utils/auth';
import { JoinArgs } from '../joinType';
import validate from '../utils/validate';

export default async (_: Object, args: JoinArgs, context: ContextArgs) => {
  await validate(args);
  user.validate(context);
  const { community } = args;

  await Join.findOneAndRemove({ community, user: context.user });
};
