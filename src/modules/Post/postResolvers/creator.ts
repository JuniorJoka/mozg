import User from '../../User';
import { PostCreatorArgs } from '../postType';

export default async (parent: PostCreatorArgs) => {
  const { creatorId } = parent;
  return await User.findById(creatorId);
};
