import { model, Schema } from 'mongoose';
import { PostType } from './postType';

const postTypes = ['text'];

const postSchema = new Schema({
  _id: { type: String, required: true, alias: 'id' },
  community: { type: String },
  creator: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String },
  type: { type: String, required: true, enum: postTypes },
});

export default model<PostType>('Post', postSchema);
