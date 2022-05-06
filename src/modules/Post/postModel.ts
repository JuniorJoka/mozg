import { model, Schema } from 'mongoose';
import { PostType } from './postType';

const postTypes = ['text'];

const postSchema = new Schema(
  {
    _id: { type: String, required: true, alias: 'id' },
    communityId: { type: String, ref: 'Community' },
    creatorId: { type: String, required: true, ref: 'User' },
    title: { type: String, required: true },
    content: { type: String },
    postType: { type: String, required: true, enum: postTypes },
    upVotes: { type: Number, required: true, default: 0 },
    downVotes: { type: Number, required: true, default: 0 },
    commentCount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default model<PostType>('Post', postSchema);
