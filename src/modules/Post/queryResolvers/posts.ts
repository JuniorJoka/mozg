import { Context } from '../../../shared/Types';

export default async (_: {}, __: {}, { models }: Context) => {
  return await models.Post.find({});
};
