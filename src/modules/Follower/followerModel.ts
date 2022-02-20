import { model, Schema } from 'mongoose';
import { followerType } from './followerType';

const followerSchema = new Schema({
  _id: { type: String, required: true, alias: 'id' },
  follower: { type: String, required: true, ref: 'User' },
  followee: { type: String, required: true, ref: 'User' },
});

export default model<followerType>('Follower', followerSchema);
