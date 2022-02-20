import faker from '@faker-js/faker';
import db from '../../utils/testdb';
import registerViewer from '../../modules/User/mutationResolvers/registerViewer';
import me from '../../modules/User/queryResolvers/me';
import { user } from '../../modules/User/utils/auth';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

describe('Me', () => {
  let username: string;
  let email: string;
  let password: string;

  beforeEach(() => {
    username = faker.internet.userName('mozg');
    email = faker.internet.email();
    password = faker.internet.password();
  });

  it('gets currently logged in user', async () => {
    const token = await registerViewer({}, { username, email, password });
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
