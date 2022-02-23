import leave from '../../modules/Join/mutationResolvers/leave';
import db from '../../utils/testdb';
import { newJoin } from '../../utils/testhelpers';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

let community: { [key: string]: string };

beforeEach(async () => {
  community = await newJoin();
});

describe('Join', () => {
  describe('leave', () => {
    it('exists community', async () => {
      const { comm_id, mem_id } = community;
      await leave({}, { community: comm_id }, { user: { id: mem_id } });
    });
  });
});
