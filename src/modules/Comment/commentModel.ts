import CommentType from './commentType';
import { model, Schema } from 'mongoose';
import { v4 } from 'uuid';

const parentTypes = ['post', 'comment'];

const commentSchema = new Schema(
  {
    _id: { type: String, required: true, alias: 'id', default: () => v4() },
    postId: { type: String, required: true, ref: 'Post' },
    parentId: { type: String, required: true },
    parentType: { type: String, required: true, enum: parentTypes },
    comment: { type: String, required: true },
    commentorId: { type: String, required: true, ref: 'User' },
    isDeleted: { type: Boolean, required: true, default: false },
    upVotes: { type: Number, required: true, default: 0 },
    downVotes: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

commentSchema.pre('save', async function (done) {
  if (this.isModified('parentType')) {
    this.set('parentType', this.get('parentType').toLowerCase());
  }

  done();
});

export default model<CommentType>('Comment', commentSchema);
