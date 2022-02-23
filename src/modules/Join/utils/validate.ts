import Community from '../../Community';
import { JoinArgs } from '../joinType';

export default async (args: JoinArgs): Promise<null> => {
  const { community } = args;
  const communityExists = await Community.findById(community);

  if (!communityExists) {
    throw new Error('Community does not exist');
  }

  return null;
};
