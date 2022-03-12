import { AuthenticationError } from 'apollo-server-express';
import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../../config';
import { AUTH_ERROR } from '../../shared/ErrorMsg';
import { ContextArgs } from '../../shared/Types';
import { UserType } from '../userType';

export const Password = {
  encrypt: async (password: string) => {
    return await hash(password, Number(config.saltRounds));
  },

  verify: async (hashedpassword: string, plainPassword: string) =>
    await compare(plainPassword, hashedpassword),
};

export const Jwt = {
  generate: (user: UserType) =>
    jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      config.jwtSecret
    ),
  verify: (token: string) => jwt.verify(token, config.jwtSecret),
};

export const user = {
  get: (token: string): jwt.JwtPayload | null => {
    if (token) {
      try {
        return Jwt.verify(token) as jwt.JwtPayload;
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  validate: (userContext: ContextArgs): string => {
    const { user } = userContext;
    if (!user) throw new AuthenticationError(AUTH_ERROR);
    return user.id;
  },
};
