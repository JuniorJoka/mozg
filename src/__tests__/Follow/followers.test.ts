import db from '../../utils/testdb';
import { newRelation, newViewer } from '../../utils/testhelpers';
import followers from '../../modules/Follower/queryResolvers/followers';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

let user1: { [key: string]: string };
let user2: { [key: string]: string };
beforeEach(async () => {
  user1 = await newViewer();
  user2 = await newViewer();
});

describe('Followers', () => {
  describe('Empty db', () => {
    it('return empty array', async () => {
      const { id } = user1;
      const relations = await followers({}, {}, { user: { id } });
      expect(relations.length).toBe(0);
    });

    describe('Filled db', () => {
      it('return relations', async () => {
        const { id } = user1;
        await newRelation(id, user2.id);
        const relations = await followers({}, {}, { user: { id } });
        expect(relations.length).toBe(1);
      });
    });
  });
});
