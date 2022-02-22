import { model, Schema } from 'mongoose';
import { CommunityType } from './communityType';

const communitySchema = new Schema(
  {
    _id: { type: String, required: true, alias: 'id' },
    name: { type: String, required: true, unique: true },
    description: { type: String, maxLength: 255 },
    creator: { type: String, ref: 'User' },
    moderators: [{ type: String, ref: 'User' }],
    followerCount: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default model<CommunityType>('Community', communitySchema);
