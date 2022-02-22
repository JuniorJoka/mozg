import db from '../../utils/testdb';
import loginViewer from '../../modules/User/mutationResolvers/loginViewer';
import { newViewer } from '../../utils/testhelpers';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

let user: { [key: string]: string };
beforeEach(async () => {
  user = await newViewer();
});

describe('LoginViewer', () => {
  describe('Login User', () => {
    it('given username and password', async () => {
      const { username, password } = user;
      const token = await loginViewer({}, { username, password });
      expect(token).toBeDefined();
    });

    it('given email and password', async () => {
      const { email, password } = user;
      const token = await loginViewer({}, { email, password });
      expect(token).toBeDefined();
    });
  });

  describe('Throws Error', () => {
    it('given non-existent user', async () => {
      const { password } = user;
      await expect(
        loginViewer({}, { username: 'non-existent', password })
      ).rejects.toThrow();

      await expect(
        loginViewer({}, { email: 'non-existent', password })
      ).rejects.toThrow();
    });

    it('given wrong password ', async () => {
      const { email } = user;
      await expect(
        loginViewer({}, { email, password: 'anotherPassword' })
      ).rejects.toThrow();
    });
  });
});
