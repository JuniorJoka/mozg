import faker from '@faker-js/faker';
import { Jwt, JwtPayload } from 'jsonwebtoken';
import User from '..';
import db from '../../../test/db';
import registerViewer from '../mutationResolvers/registerViewer';

import { user } from '../utils/auth';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

describe('Auth', () => {
  let username: string;
  let email: string;
  let password: string;
  let token: string;

  beforeEach(async () => {
    username = faker.internet.userName('mozg');
    email = faker.internet.email();
    password = faker.internet.password();
    token = await registerViewer({}, { username, email, password });
  });

  describe('LoggedIn User', () => {
    it('returns logged in user on valid token', async () => {
      const tokenuser = user.get(token) as JwtPayload;
      expect(tokenuser.id).toBeDefined();
    });

    it('returns null on invalid token', async () => {
      const tokenUser = user.get('sometoken');
      expect(tokenUser).toBeNull();
    });
  });
});
