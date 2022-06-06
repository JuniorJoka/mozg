import { RegisterViewerArgs } from '../userType';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server';
import { INVALID_ARG_ERROR } from '../../../shared/ErrorMsg';
import config from '../../../config';
import { Context } from '../../../shared/Types';

export default async (
  _: Object,
  args: RegisterViewerArgs,
  { models }: Context
) => {
  const { username, email, password } = args;

  if (!username || username.length < 4 || !email || !args.password) {
    throw new UserInputError(INVALID_ARG_ERROR);
  }

  //create user
  const newUser = await models.User.create({ username, email, password });
  // save user to db
  const user = await newUser.save();

  // generate token from user id
  const token = jwt.sign(
    { data: { id: user.id, username: user.username, email: user.email } },
    config.jwtSecret,
    {
      expiresIn: '7 days',
    }
  );

  return { token, user };
};
