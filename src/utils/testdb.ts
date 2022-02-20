import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;
let connection: typeof mongoose;

const connect = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  connection = await mongoose.connect(uri, { dbName: 'test' });
};

const disconnect = async () => {
  await connection.disconnect();
  await mongod.stop();
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (let key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export default {
  connect,
  clearDatabase,
  disconnect,
};
