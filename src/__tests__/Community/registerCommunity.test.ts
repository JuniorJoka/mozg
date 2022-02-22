import faker from '@faker-js/faker';
import db from '../../utils/testdb';
import registerCommunity from '../../modules/Community/mutationResolvers/registerCommunity';
import Community from '../../modules/Community';
import { newCommunity, newViewer } from '../../utils/testhelpers';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

let user: { [key: string]: string };
let community: { [key: string]: string };

beforeEach(async () => {
  user = await newViewer();
  community = await newCommunity(user.id);
});

describe('RegisterCommunity', () => {
  describe('Registers Community', () => {
    it('given valid input data', async () => {
      expect(community.comm_id).toBeDefined();
      const communityLookup = await Community.findById(community.comm_id);
      expect(communityLookup?.creator).toBe(user.id);
      expect(communityLookup?.name).toBe(community.name);
      expect(communityLookup?.description).toBe(community.description);
    });
  });

  describe('Throws Error', () => {
    it('given invalid input data', async () => {
      await expect(
        registerCommunity({}, { name: '' }, { user: { id: user.id } })
      ).rejects.toThrow();
    });

    it('given already existing community name', async () => {
      const name = faker.internet.userName();
      await registerCommunity({}, { name }, { user: { id: user.id } });
      await expect(
        registerCommunity({}, { name }, { user: { id: user.id } })
      ).rejects.toThrow();
    });
  });
});
