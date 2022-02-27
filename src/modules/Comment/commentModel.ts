import { model, Schema } from 'mongoose';
import { CommentType } from './commentType';

const parentTypes = ['post', 'comment'];

const commentSchema = new Schema(
  {
    _id: { type: String, required: true, alias: 'id' },
    post: { type: String, required: true, ref: 'Post' },
    parent: {
      title: { type: String, required: true },
      id: { type: String, required: true },
      type: { type: String, enum: parentTypes, required: true },
    },
    comment: { type: String, required: true },
    commentor: {
      id: { type: String, required: true, ref: 'User' },
      username: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default model<CommentType>('Comment', commentSchema);
