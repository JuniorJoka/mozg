import validate from '../../modules/Join/utils/validate';
import db from '../../utils/testdb';
import { newJoin } from '../../utils/testhelpers';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

let community: { [key: string]: string };

beforeEach(async () => {
  community = await newJoin();
});

describe('Validate', () => {
  it('returns null on valid community', async () => {
    const res = await validate({ community: community.comm_id });
    expect(res).toBeNull();
  });

  it('throws on non-existing community', async () => {
    await expect(validate({ community: 'some community' })).rejects.toThrow();
  });
});
