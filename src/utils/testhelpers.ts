import faker from '@faker-js/faker';
import { JwtPayload } from 'jsonwebtoken';
import registerCommunity from '../modules/Community/mutationResolvers/registerCommunity';
import follow from '../modules/Follower/mutationResolvers/follow';
import registerViewer from '../modules/User/mutationResolvers/registerViewer';
import { user } from '../modules/User/utils/auth';

export const newViewer = async () => {
  let username = faker.internet.userName('mozg');
  let password = faker.internet.password();
  let email = faker.internet.email();
  const token = await registerViewer({}, { username, password, email });
  const loggedUser = user.get(token) as JwtPayload;
  const id: string = loggedUser.id;
  return { username, password, email, token, id };
};

export const newCommunity = async (id: string) => {
  const name = faker.name.firstName();
  const description = faker.company.catchPhrase();
  const comm_id = await registerCommunity(
    {},
    { name, description },
    { user: { id } }
  );
  return { name, description, comm_id, creator: id };
};

// export const newFollow = async (id: string, followee: string) => {
//   await follow({}, { followee }, { user: { id } });
// };

export const newRelation = async (id: string, followee: string) => {
  await follow({}, { followee }, { user: { id } });
  await follow({}, { followee: id }, { user: { id: followee } });
};
