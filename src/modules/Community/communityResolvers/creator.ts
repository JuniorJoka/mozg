import { CommunityCreatorArgs } from '../communityType';
import { Context } from '../../../shared/Types';

export default async (
  parent: CommunityCreatorArgs,
  _: {},
  { models }: Context
) => {
  const { creatorId } = parent;

  return await models.User.findById(creatorId);
};
