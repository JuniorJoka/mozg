import faker from '@faker-js/faker';
import User from '../../modules/User';
import db from '../../utils/testdb';
import registerViewer from '../../modules/User/mutationResolvers/registerViewer';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

describe('RegisterViewer', () => {
  // setup
  const username = faker.internet.userName('mozg');
  const email = faker.internet.email();
  const password = faker.internet.password();

  describe('Registers User', () => {
    it('given correct input values', async () => {
      const token = await registerViewer(
        {},
        { username: username + username, email, password }
      );
      expect(token).toBeDefined();
    });

    it('save user to database', async () => {
      await registerViewer({}, { username, email, password });
      const user = await User.findOne({ email });

      expect(user?.email).toBe(email);
      expect(user?.email).toBe(email);
    });

    it('should not save raw password to db', async () => {
      await registerViewer({}, { username, email, password });
      const user = await User.findOne({ email });

      expect(user?.password).not.toBe(password);
    });
  });

  describe('Throws Error', () => {
    it('given an empty string input', async () => {
      await expect(
        registerViewer({}, { username: '', email: '', password: '' })
      ).rejects.toThrow();

      await expect(
        registerViewer({}, { username: '', email, password })
      ).rejects.toThrow();

      await expect(
        registerViewer({}, { username, email: '', password })
      ).rejects.toThrow();

      await expect(
        registerViewer({}, { username, email, password: '' })
      ).rejects.toThrow();
    });

    it('given short username', async () => {
      await expect(
        registerViewer(
          {},
          { username: 'moz', email: email, password: password }
        )
      ).rejects.toThrow();
    });
  });
});
