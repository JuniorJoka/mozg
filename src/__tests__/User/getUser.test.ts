import faker from '@faker-js/faker';
import User from '../../modules/User';
import db from '../../utils/testdb';
import getUser from '../../modules/User/queryResolvers/getUser';
import { UserType } from '../../modules/User/userType';

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
      for (let i = 0; i < 2; i++) {
        email = faker.internet.email();
        password = faker.internet.password();
        username = faker.internet.userName(`mozg${i}`);
        _id = faker.git.commitSha();
        const user = await User.create({ _id, email, password, username });
        await user.save();
      }
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
