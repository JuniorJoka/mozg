import jwt from 'jsonwebtoken';
import config from '../../../config';
import { refreshTokens } from '../../../loaders/apollo';
import { Jwt } from '../utils/auth';

export default async (
  _: Object,
  __: Object,
  { refreshToken }: { refreshToken: string }
) => {
  const token = Jwt.verify(refreshToken) as unknown as { data: string };

  if (token.data in refreshTokens) {
    return jwt.sign({ data: refreshTokens[token.data] }, config.jwtSecret, {
      expiresIn: '7 days',
    });
  }
};
