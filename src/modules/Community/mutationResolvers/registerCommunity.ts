import { UserInputError } from 'apollo-server-express';
import { v4 } from 'uuid';
import Community from '..';

import { ContextArgs } from '../../../shared/Types';
import { registerCommunityArgs } from '../communityType';
import { user } from '../../User/utils/auth';

export default async (
  _: Object,
  args: registerCommunityArgs,
  context: ContextArgs
) => {
  const { name, description } = args;

  const creator = user.validate(context);
  if (!name) {
    throw new UserInputError('Invalid community name');
  }

  const id = v4();
  const community = await Community.create({
    id,
    name,
    creator,
    description,
  });

  // TODO: creator should follow community
  await community.save();
  return id;
};
