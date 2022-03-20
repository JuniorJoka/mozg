import { AuthenticationError } from 'apollo-server-express';
import User from '..';
import { LOGGING_ERROR } from '../../../shared/ErrorMsg';
import { LoginViewerArgs } from '../userType';
import { Jwt, Password } from '../utils/auth';

export default async (_: object, args: LoginViewerArgs) => {
  const { username, password, email } = args;

  // get user
  const user = await User.findOne({ $or: [{ username }, { email }] });

  // throw auth error on no user
  if (!user) {
    throw new AuthenticationError(LOGGING_ERROR);
  }

  const passwordIsValid = await Password.verify(user.password, password);

  // throw auth error on wrong password
  if (!passwordIsValid) {
    throw new AuthenticationError(LOGGING_ERROR);
  }

  // create token
  const token = Jwt.generate(user);
  return token;
};
