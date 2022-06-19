import { model, Schema } from 'mongoose';
import { v4 } from 'uuid';
import PostType from './postType';

const postTypes = ['text'];

const postSchema = new Schema(
  {
    _id: { type: String, required: true, alias: 'id', default: () => v4() },
    communityId: { type: String, ref: 'Community' },
    creatorId: { type: String, required: true, ref: 'User' },
    title: { type: String, required: true },
    content: { type: String },
    postType: { type: String, required: true, enum: postTypes },
  },
  { timestamps: true }
);

export default model<PostType>('Post', postSchema);
