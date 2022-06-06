import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import config from '../../../config';
import { LOGGING_ERROR } from '../../../shared/ErrorMsg';
import { Context } from '../../../shared/Types';
import { LoginViewerArgs } from '../userType';

export default async (_: {}, args: LoginViewerArgs, { models }: Context) => {
  const { login, password } = args;

  // get user
  const user = await models.User.findByLogin(login);

  // throw auth error on no user
  if (!user) {
    throw new AuthenticationError(LOGGING_ERROR);
  }

  const validPassword = await user.validatePassword(password);

  // throw auth error on wrong password
  if (!validPassword) {
    throw new AuthenticationError(LOGGING_ERROR);
  }

  // generate token
  const { username, email, id } = user;
  const token = jwt.sign({ data: { username, email, id } }, config.jwtSecret, {
    expiresIn: '7 days',
  });

  return { user, token };
};
