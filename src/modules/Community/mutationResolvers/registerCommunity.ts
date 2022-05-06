import { UserInputError } from 'apollo-server-express';
import { v4 } from 'uuid';

import { Context } from '../../../shared/Types';
import { registerCommunityArgs } from '../communityType';
import { user } from '../../User/utils/auth';

export default async (_: {}, args: registerCommunityArgs, context: Context) => {
  const { communityName, communityDescription } = args;

  const creator = user.validate(context);
  if (!communityName) {
    throw new UserInputError('Invalid community name');
  }

  const { models } = context;

  const id = v4();
  const community = await models.Community.create({
    id,
    communityName,
    creatorId: creator,
    communityDescription,
  });

  // TODO: creator should follow community
  await community.save();
  return id;
};
