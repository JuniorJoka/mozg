import { model, Schema } from 'mongoose';
import { v4 } from 'uuid';
import followType from './followType';

const followerSchema = new Schema({
  _id: { type: String, required: true, alias: 'id', default: () => v4() },
  followerId: { type: String, required: true, ref: 'User' },
  followeeId: { type: String, required: true, ref: 'User' },
  reciprocated: { type: Boolean, default: false },
});

export default model<followType>('Follower', followerSchema);
