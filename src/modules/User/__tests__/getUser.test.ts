import faker from '@faker-js/faker';
import User from '..';
import db from '../../../test/db';
import getUser from '../queryResolvers/getUser';
import { UserType } from '../userType';

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());
afterEach(async () => db.clearDatabase());

let email: string;
let password: string;
let username: string;
let _id: string;

describe('GetUser', () => {
  describe('On filled database', () => {
    beforeEach(async () => {
      email = faker.internet.email();
      password = faker.internet.password();
      username = faker.internet.userName('mozg');
      _id = faker.git.commitSha();

      const user1 = await User.create({ _id, email, password, username });
      email = faker.internet.email();
      password = faker.internet.password();
      username = faker.internet.userName('mozq');
      _id = faker.git.commitSha();

      const user2 = await User.create({ _id, email, password, username });
      await user1.save();
      await user2.save();
    });
    it('finds right user given id', async () => {
      const user = (await getUser({}, { id: _id })) as UserType;
      expect(user?._id).toBe(_id);
      expect(user?.email).toBe(email);
      expect(user?.username).toBe(username);
    });

    it('find all users', async () => {
      const users = (await getUser({}, {})) as UserType[];
      expect(users.length).toBe(2);
    });

    it('returns null on wrong id ', async () => {
      const user = await getUser({}, { id: 'someid' });
      expect(user).toBeNull();
    });
  });
  describe('On empty database', () => {
    it('return empty array on no data', async () => {
      const users = (await getUser({}, {})) as UserType[];
      expect(users.length).toBe(0);
    });
  });
});
