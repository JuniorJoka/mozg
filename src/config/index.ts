import 'dotenv/config';

export default {
  serverPort: process.env.SERVER_PORT as string,
  databasePort: process.env.DB_PORT as string,
  jwtSecret: process.env.JWT_SECRET as string,
  saltRounds: process.env.SALT_ROUNDS as string,
};
