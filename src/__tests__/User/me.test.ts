import db from '../../utils/testdb';
import me from '../../modules/User/queryResolvers/me';
import { user } from '../../modules/User/utils/auth';
import { newViewer } from '../../utils/testhelpers';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());
let logged: { [key: string]: string };

beforeEach(async () => (logged = await newViewer()));

describe('Me', () => {
  it('gets currently logged in user', async () => {
    const { username, email, token } = logged;
    const currentUser = user.get(token);
    const loggedInUser = await me({}, {}, { user: currentUser });
    expect(loggedInUser?.email).toBe(email);
    expect(loggedInUser?.username).toBe(username);
  });

  it('return null on null user', async () => {
    const loggedInUser = await me({}, {}, { user: null });
    expect(loggedInUser).toBeNull();
  });
});
