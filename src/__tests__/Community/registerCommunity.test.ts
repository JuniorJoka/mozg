import faker from '@faker-js/faker';
import db from '../../utils/testdb';
import registerCommunity from '../../modules/Community/mutationResolvers/registerCommunity';
import Community from '../../modules/Community';
import registerViewer from '../../modules/User/mutationResolvers/registerViewer';
import { user } from '../../modules/User/utils/auth';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

let name: string;
let userId: string;
let description: string;
let community_id: string;

beforeEach(async () => {
  // create user to create to create community
  let username = faker.internet.userName('mozg');
  let password = faker.internet.password();
  let email = faker.internet.email();
  const token = await registerViewer({}, { username, password, email });
  const loggedUser = user.get(token);
  userId = loggedUser?.id;

  // create community
  name = faker.name.firstName();
  description = faker.company.catchPhrase();
  community_id = await registerCommunity(
    {},
    { name, description },
    { user: { id: userId } }
  );
});

describe('RegisterCommunity', () => {
  describe('Registers Community', () => {
    it('given valid input data', async () => {
      expect(community_id).toBeDefined();
      const community = await Community.findById(community_id);
      expect(community?.creator).toBe(userId);
      expect(community?.name).toBe(name);
      expect(community?.description).toBe(description);
    });
  });

  describe('Throws Error', () => {
    it('given invalid input data', async () => {
      await expect(
        registerCommunity({}, { name: '' }, { user: { id: userId } })
      ).rejects.toThrow();
    });
    it('given non-existent user', async () => {
      await expect(
        registerCommunity(
          {},
          { name: 'someOtherName' },
          { user: { id: 'wrongId' } }
        )
      ).rejects.toThrow();
    });

    it('given already existing community name', async () => {
      const name = faker.internet.userName();
      await registerCommunity({}, { name }, { user: { id: userId } });
      await expect(
        registerCommunity({}, { name }, { user: { id: userId } })
      ).rejects.toThrow();
    });
  });
});
