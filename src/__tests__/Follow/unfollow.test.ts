import { newViewer } from '../../utils/testhelpers';
import db from '../../utils/testdb';
import follow from '../../modules/Follower/mutationResolvers/follow';
import unfollow from '../../modules/Follower/mutationResolvers/unfollow';
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

describe('Unfollow', () => {
  it('given valid entries', async () => {
    const { id } = user1;
    const followee = user2.id;
    await follow({}, { followee }, { user: { id } });
    const unfollowed = await unfollow({}, { followee }, { user: { id } });
    expect(unfollowed).toBeTruthy();
  });

  it('reverses reciprocated state', async () => {
    const { id } = user1;
    const followee = user2.id;
    await follow({}, { followee }, { user: { id } });
    await follow({}, { followee: id }, { user: { id: followee } });
    await unfollow({}, { followee }, { user: { id } });
    const relation = await Follower.findOne({
      follower: followee,
      followee: id,
    });
    expect(relation?.reciprocated).toBeFalsy();
  });

  it('delete documents', async () => {
    const { id } = user1;
    const followee = user2.id;
    await follow({}, { followee }, { user: { id } });
    await unfollow({}, { followee }, { user: { id } });
    const followers = await Follower.find({});
    expect(followers.length).toBe(0);
  });
});
