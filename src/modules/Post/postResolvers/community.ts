import Post from '../postType';
import { Context } from '../../../shared/Types';

export default async ({ communityId }: Post, _: {}, { models }: Context) => {
  return await models.Community.findById(communityId);
};
