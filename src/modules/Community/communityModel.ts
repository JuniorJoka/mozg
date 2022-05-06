import { model, Schema } from 'mongoose';
import { CommunityType } from './communityType';

const communitySchema = new Schema(
  {
    _id: { type: String, required: true, alias: 'id' },
    communityName: { type: String, required: true, unique: true },
    communityDescription: { type: String, maxLength: 255 },
    creatorId: { type: String, ref: 'User' },
    moderators: [{ type: String, ref: 'User' }],
    followerCount: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default model<CommunityType>('Community', communitySchema);
