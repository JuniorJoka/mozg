import mongoose from 'mongoose';
import config from '../config';

export default async () => {
  mongoose.connect(`mongodb://mongodb:${config.databasePort}/mozg`, {});
  mongoose.connection.on('error', (err) => {
    console.log('err', err);
  });
  mongoose.connection.on('connected', () => {
    console.log('mongoose is connected');
  });
};
