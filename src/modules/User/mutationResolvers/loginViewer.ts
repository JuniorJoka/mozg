import { AuthenticationError } from 'apollo-server-express';
import User from '..';
import { LoginViewerArgs } from '../userType';
import { Jwt, Password } from '../utils/auth';

export default async (_: object, args: LoginViewerArgs) => {
  const { username, password, email } = args;

  // get user
  const user = await User.findOne({ $or: [{ username }, { email }] });

  // throw auth error on no user
  if (!user) {
    throw new AuthenticationError('Error Signing In');
  }

  const passwordIsValid = await Password.verify(user.password, password);

  // throw auth error on wrong password
  if (!passwordIsValid) {
    throw new AuthenticationError('Error Signing In');
  }

  // create token
  const token = Jwt.generate(user);
  return token;
};
