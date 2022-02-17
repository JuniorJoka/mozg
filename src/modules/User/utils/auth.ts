import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../../config';
import { UserType } from '../userType';

export const Password = {
  encrypt: async (password: string) => {
    return await hash(password, Number(config.saltRounds));
  },

  verify: async (hashedpassword: string, plainPassword: string) =>
    await compare(plainPassword, hashedpassword),
};

export const Jwt = {
  generate: (user: UserType) => jwt.sign({ id: user._id }, config.jwtSecret),
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
};
