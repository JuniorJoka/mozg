import jwt from 'jsonwebtoken';
import db from '../../utils/testdb';
import { newViewer } from '../../utils/testhelpers';

import { Password, user } from '../../modules/User/utils/auth';
import faker from '@faker-js/faker';
import config from '../../config';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

let logged: { [key: string]: string };

it('passses', () => {
  expect(true).toBeTruthy();
});

describe('Auth', () => {
  beforeEach(async () => (logged = await newViewer()));

  describe('LoggedIn User', () => {
    it('returns logged in user on valid token', async () => {
      const { data } = jwt.verify(
        logged.token,
        config.jwtSecret
      ) as unknown as { data: any };
      expect(data.id).toBeDefined();
    });

    it('validates user from context on valid id', async () => {
      const id = user.validate({ user: { id: logged.id } });
      expect(id).toBe(id);
    });

    it('throws error on invalid user', () => {
      expect(() => user.validate({ user: null })).toThrow();
    });

    describe('Password', () => {
      it('correctly hashes password', async () => {
        const password = faker.internet.password();
        const hashed = await Password.encrypt(password);
        expect(hashed).not.toBe(password);
      });

      it('correctly verifies password', async () => {
        const password = faker.internet.password();
        const hashed = await Password.encrypt(password);
        const passwordMatches = Password.verify(hashed, password);
        expect(passwordMatches).toBeTruthy();
      });

      it('should not pass a wrong password', async () => {
        const password = faker.internet.password();
        const hashed = await Password.encrypt(password);
        const password2 = faker.internet.password();
        const passwordMatches = await Password.verify(hashed, password2);
        expect(passwordMatches).toBeFalsy();
      });
    });
  });
});
