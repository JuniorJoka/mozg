import db from '../../utils/testdb';
import { newViewer } from '../../utils/testhelpers';
import follow from '../../modules/Follower/mutationResolvers/follow';
import Follower from '../../modules/Follower';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

let user1: { [key: string]: string };
let user2: { [key: string]: string };
beforeEach(async () => {
  user1 = await newViewer();
  user2 = await newViewer();
});

describe('Follower', () => {
  describe('Follow', () => {
    it('on valid employee', async () => {
      const { id } = user1;
      const followee = user2.id;
      const followed = await follow({}, { followee }, { user: { id } });
      expect(followed).toBeTruthy();
    });

    it('not reciprocated on init', async () => {
      const { id } = user1;
      const followee = user2.id;
      await follow({}, { followee }, { user: { id } });
      const relationship = await Follower.findOne({ follower: id, followee });
      expect(relationship?.reciprocated).toBeFalsy();
    });

    it('reciprocated on follow back', async () => {
      const { id } = user1;
      const followee = user2.id;
      await follow({}, { followee }, { user: { id } });
      await follow({}, { followee: id }, { user: { id: followee } });
      const rel1 = await Follower.findOne({ follower: id, followee });
      const rel2 = await Follower.findOne({ follower: followee, followee: id });
      expect(rel1?.reciprocated).toBeTruthy();
      expect(rel2?.reciprocated).toBeTruthy();
    });

    it('should not duplicate relationship', async () => {
      const { id } = user1;
      const followee = user2.id;
      await follow({}, { followee }, { user: { id } });
      await follow({}, { followee }, { user: { id } });
      const relations = await Follower.find({});
      expect(relations.length).toBe(1);
    });
  });

  describe('Throws Error', () => {
    it('given invalid followee', async () => {
      const { id } = user1;
      await expect(
        follow({}, { followee: 'someid' }, { user: { id } })
      ).rejects.toThrow();
    });
  });
});
