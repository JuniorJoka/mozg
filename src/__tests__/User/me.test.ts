import jwt from 'jsonwebtoken';
import config from '../../config';
import db from '../../utils/testdb';
import me from '../../modules/User/queryResolvers/me';
import { newViewer } from '../../utils/testhelpers';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());
let logged: { [key: string]: string };

beforeEach(async () => (logged = await newViewer()));

describe('Me', () => {
  it('gets currently logged in user', async () => {
    const { username, email, token } = logged;
    const { data } = jwt.verify(token, config.jwtSecret) as unknown as {
      data: any;
    };
    const loggedInUser = await me({}, {}, { user: data });
    expect(loggedInUser?.email).toBe(email);
    expect(loggedInUser?.username).toBe(username);
  });

  it('return null on null user', async () => {
    const loggedInUser = await me({}, {}, { user: null });
    expect(loggedInUser).toBeNull();
  });
});
