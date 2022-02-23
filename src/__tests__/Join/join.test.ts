import Join from '../../modules/Join';
import join from '../../modules/Join/mutationResolvers/join';
import db from '../../utils/testdb';
import { newCommunity, newViewer } from '../../utils/testhelpers';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

let community: { [key: string]: string };
let user: { [key: string]: string };

beforeEach(async () => {
  const { id } = await newViewer();
  user = await newViewer();
  community = await newCommunity(id);
});

describe('Join', () => {
  describe('join', () => {
    it('joins community', async () => {
      await join(
        {},
        { community: community.comm_id },
        { user: { id: user.id } }
      );
      const joins = await Join.find({});
      // subject to change when community creators are automatically joined
      expect(joins.length).toBe(1);
    });

    it('should not create additional joins', async () => {
      await join(
        {},
        { community: community.comm_id },
        { user: { id: user.id } }
      );
      await join(
        {},
        { community: community.comm_id },
        { user: { id: user.id } }
      );
      const joins = await Join.find({});
      expect(joins.length).toBe(1);
    });
  });
});
