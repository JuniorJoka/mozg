import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { v4 } from 'uuid';
import Community from '..';
import User from '../../User';
import { ContextArgs } from '../../shared/Types';
import { registerCommunityArgs } from '../communityType';

export default async (
  _: Object,
  args: registerCommunityArgs,
  context: ContextArgs
) => {
  const { name, description } = args;
  let { user } = context;
  const id = v4();

  if (!name) {
    throw new UserInputError('Invalid community name');
  }

  // validate crator against database
  const isValidUser = await User.findById(user?.id);
  if (!isValidUser) {
    throw new AuthenticationError('Invalid user');
  }

  const community = await Community.create({
    id,
    name,
    creator: user?.id,
    description,
  });

  // TODO: creator should follow community
  await community.save();
  return id;
};
