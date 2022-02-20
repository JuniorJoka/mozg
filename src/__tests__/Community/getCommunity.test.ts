import faker from '@faker-js/faker';
import Community from '../../modules/Community';
import db from '../../utils/testdb';
import registerCommunity from '../../modules/Community/mutationResolvers/registerCommunity';
import getCommunity from '../../modules/Community/queryResolvers/getCommunity';
import { CommunityType } from '../../modules/Community/communityType';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

let _id: string;
let name: string;
let creator: string;

describe('Get Community', () => {
  describe('On filled database', () => {
    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        _id = faker.git.commitSha();
        name = faker.name.firstName();
        creator = faker.git.commitSha();
        const community = await Community.create({ _id, name, creator });
        await community.save();
      }
    });

    it('gets community given right id', async () => {
      const community = (await getCommunity({}, { id: _id })) as CommunityType;
      expect(community?._id).toBe(_id);
      expect(community?.name).toBe(name);
      expect(community?.creator).toBe(creator);
    });
    it('gets all communities', async () => {
      const communities = (await getCommunity({}, {})) as CommunityType[];
      expect(communities.length).toBe(3);
    });

    it('return null on wrong id', async () => {
      const community = await getCommunity({}, { id: 'someid' });
      expect(community).toBeNull();
    });
  });

  describe('On empty database', () => {
    it('returns empty array on community query', async () => {
      const communities = (await getCommunity({}, {})) as CommunityType[];
      expect(communities.length).toBe(0);
    });
  });
});
