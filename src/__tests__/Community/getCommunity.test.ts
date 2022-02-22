import faker from '@faker-js/faker';
import db from '../../utils/testdb';
import getCommunity from '../../modules/Community/queryResolvers/getCommunity';
import { CommunityType } from '../../modules/Community/communityType';
import { newCommunity } from '../../utils/testhelpers';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

let community: { [key: string]: string };

describe('Get Community', () => {
  describe('On filled database', () => {
    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        community = await newCommunity(faker.git.commitSha());
      }
    });

    it('gets community given right id', async () => {
      const communityLookup = (await getCommunity(
        {},
        { id: community.comm_id }
      )) as CommunityType;
      expect(communityLookup?._id).toBe(community.comm_id);
      expect(communityLookup?.name).toBe(community.name);
      expect(communityLookup?.creator).toBe(community.creator);
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
