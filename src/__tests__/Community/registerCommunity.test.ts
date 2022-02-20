import faker from '@faker-js/faker';
import db from '../../utils/testdb';
import registerCommunity from '../../modules/Community/mutationResolvers/registerCommunity';
import Community from '../../modules/Community';

let name: string;
let creator: string;
let description: string;
let community_id: string;

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());
beforeEach(async () => {
  name = faker.name.firstName();
  creator = faker.git.commitSha();
  description = faker.company.catchPhrase();
  community_id = await registerCommunity({}, { name, creator, description });
});

describe('RegisterCommunity', () => {
  describe('Registers Community', () => {
    it('given valid input data', async () => {
      expect(community_id).toBeDefined();
      const community = await Community.findById(community_id);
      expect(community?.creator).toBe(creator);
      expect(community?.name).toBe(name);
      expect(community?.description).toBe(description);
    });
  });
  describe('Throws Error', () => {
    it('given invalid input data', async () => {
      await expect(
        registerCommunity({}, { name: '', creator: '', description })
      ).rejects.toThrow();
    });
    //   TODO: verify user is register user
  });
});
