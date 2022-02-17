import faker from '@faker-js/faker';
import db from '../../../test/db';
import User from '..';
import loginViewer from '../mutationResolvers/loginViewer';
import registerViewer from '../mutationResolvers/registerViewer';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

let email: string;
let password: string;
let username: string;

beforeEach(async () => {
  email = faker.internet.email();
  password = faker.internet.password();
  username = faker.internet.userName('mozg');

  await registerViewer({}, { username, email, password });
});

describe('LoginViewer', () => {
  describe('Login User', () => {
    it('given username and password', async () => {
      const token = await loginViewer({}, { username, password });
      expect(token).toBeDefined();
    });

    it('given email and password', async () => {
      const token = await loginViewer({}, { email, password });
      expect(token).toBeDefined();
    });
  });

  describe('Throws Error', () => {
    it('given non-existent user', async () => {
      await expect(
        loginViewer({}, { username: 'non-existent', password })
      ).rejects.toThrow();

      await expect(
        loginViewer({}, { email: 'non-existent', password })
      ).rejects.toThrow();
    });

    it('given wrong password ', async () => {
      await expect(
        loginViewer({}, { email, password: 'anotherPassword' })
      ).rejects.toThrow();
    });
  });
});
