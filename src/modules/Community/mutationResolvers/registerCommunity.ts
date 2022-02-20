import { UserInputError } from 'apollo-server-express';
import { v4 } from 'uuid';
import Community from '..';
import { registerCommunityArgs } from '../communityType';

export default async (_: Object, args: registerCommunityArgs) => {
  const { name, creator, description } = args;
  const id = v4();

  if (!name || !creator) {
    throw new UserInputError('Invalid username or creator');
  }

  const community = await Community.create({ id, name, creator, description });
  // TODO: creator should follow community
  await community.save();
  return id;
};
