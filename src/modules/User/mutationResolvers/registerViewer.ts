import { RegisterViewerArgs } from '../userType';
import User from '..';
import { Jwt, Password } from '../utils/auth';
import { v4 } from 'uuid';
import { UserInputError } from 'apollo-server';

export default async (_: Object, args: RegisterViewerArgs): Promise<string> => {
  const { username, email } = args;

  if (!username || username.length < 4 || !email || !args.password) {
    throw new UserInputError('Invalid argument value');
  }

  const hashedPassword = await Password.encrypt(args.password);

  //create user
  const user = await User.create({
    id: v4(),
    username,
    email,
    password: hashedPassword,
  });

  // generate token from user id
  const token = Jwt.generate(user);

  // save user to database
  await user.save();

  return token;
};
