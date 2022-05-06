import { v4 } from 'uuid';
import Join from '..';
import { Context } from '../../../shared/Types';
import { user } from '../../User/utils/auth';
import { JoinArgs } from '../joinType';
import validate from '../utils/validate';

export default async (_: {}, args: JoinArgs, context: Context) => {
  await validate(args);
  user.validate(context);

  const { communityId } = args;
  const id = v4();

  const docExists = await Join.findOne({
    communityId,
    memberId: context.user?.id,
  });
  if (docExists) return null;

  const doc = await Join.create({
    id,
    communityId,
    memberId: context.user?.id,
  });
  await doc.save();

  return null;
};
