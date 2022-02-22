import { JwtPayload } from 'jsonwebtoken';
import db from '../../utils/testdb';
import { newViewer } from '../../utils/testhelpers';

import { user } from '../../modules/User/utils/auth';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

let logged: { [key: string]: string };

beforeEach(async () => (logged = await newViewer()));

describe('Auth', () => {
  describe('LoggedIn User', () => {
    it('returns logged in user on valid token', async () => {
      const tokenuser = user.get(logged.token) as JwtPayload;
      expect(tokenuser.id).toBeDefined();
    });

    it('returns null on invalid token', async () => {
      const tokenUser = user.get('sometoken');
      expect(tokenUser).toBeNull();
    });
  });
});
