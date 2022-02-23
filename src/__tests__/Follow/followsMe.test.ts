import followsMe from '../../modules/Follower/queryResolvers/followsMe';
import db from '../../utils/testdb';
import { newRelation, newViewer } from '../../utils/testhelpers';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

let user1: { [key: string]: string };
let user2: { [key: string]: string };
beforeEach(async () => {
  user1 = await newViewer();
  user2 = await newViewer();
});

describe('Follows Me', () => {
  it('returns false on non-existent relations', async () => {
    const { id } = user1;
    const followee = user2.id;
    const result = await followsMe({}, { followee }, { user: { id } });
    expect(result).toBeFalsy();
  });

  it('returns true on existing relations', async () => {
    const { id } = user1;
    const followee = user2.id;
    await newRelation(id, followee);
    const result = await followsMe({}, { followee }, { user: { id } });
    expect(result).toBeTruthy();
  });
});
