import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { user } from '../modules/User/utils/auth';
import schema from '../schema';

export default async (app: Express) => {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.headers.authorization;
      let logUser = user.get(token || '');
      return { user: logUser };
    },
  });
  await server.start();
  server.applyMiddleware({ app, path: '/' });
  return server;
};
