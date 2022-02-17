import mongooseLoader from './mongoose';
import expressLoader from './express';
import apolloLoader from './apollo';

export default {
  init: async () => {
    await mongooseLoader();
    const app = expressLoader();
    const server = await apolloLoader(app);

    return { app, server };
  },
};
