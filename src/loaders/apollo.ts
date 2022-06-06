import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import schema from '../schema';
import models from '../modules';
import { Context, User } from '../shared/Types';

export const refreshTokens: Record<string, string | JwtPayload> = {};

const corsOptions = {
  origin: config.accessOrigin,
  methods: 'GET, HEAD, POST, PUT, DELETE , PATCH',
  credentials: true,
};

export default async (app: Express) => {
  const server = new ApolloServer({
    schema,

    // formatResponse: (response, requestContext) => {
    //   // return response;
    //   // force return 401 on errors which are not related to bad credentials i.e password
    //   if (response.errors && !requestContext.request.variables?.password) {
    //     if (requestContext.response?.http) {
    //       requestContext.response.http.status = 401;
    //     }
    //   } else if (response.data?.login || response.data?.refresh) {
    //     const tokenExpireDate = new Date();
    //     tokenExpireDate.setDate(
    //       tokenExpireDate.getDate() + 60 * 60 * 24 * 7 // 7 days
    //     );

    //     const refreshTokenId = v4();

    //     const token = jwt.verify(
    //       response.data?.login || response.data?.refresh,
    //       config.jwtSecret
    //     ) as unknown as { data: any };

    //     refreshTokens[refreshTokenId] = token.data;
    //     const refreshToken = jwt.sign(
    //       { data: refreshTokenId },
    //       config.jwtSecret,
    //       {
    //         expiresIn: '7 days',
    //       }
    //     );

    //     requestContext.response?.http?.headers.append(
    //       'Set-cookie',
    //       `refreshToken=${refreshToken}; expires=${tokenExpireDate}`
    //     );
    //   }

    //   return response;
    // },

    context: ({ req }) => {
      const ctx: Context = { user: null, models };

      // const cookies: { [key: string]: string } = {};
      // const cookieRaw = req.headers?.cookie ?? '';
      // if (cookieRaw) {
      //   for (let cookie of cookieRaw.split(';')) {
      //     const [name, value] = cookie.split('=');
      //     cookies[name.trim()] = value.trim();
      //   }
      // }

      // ctx.refreshToken = cookies?.refreshToken;

      if (req.headers['x-access-token']) {
        try {
          const token = jwt.verify(
            req.headers['x-access-token'] as string,
            config.jwtSecret
          ) as unknown as { data: User };
          ctx.user = token.data;
        } catch (e) {
          ctx.user = null;
        }
      }
      return ctx;
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: '/', cors: corsOptions });
  return server;
};
