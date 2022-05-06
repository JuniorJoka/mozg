import Community from '../../Community';
import { JoinArgs } from '../joinType';

export default async (args: JoinArgs): Promise<null> => {
  const { communityId } = args;
  const communityExists = await Community.findById(communityId);

  if (!communityExists) {
    throw new Error('Community does not exist');
  }

  return null;
};
