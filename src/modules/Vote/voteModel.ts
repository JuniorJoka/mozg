import { model, Model, Schema } from 'mongoose';
import { v4 } from 'uuid';

const voteSchema = new Schema({
  _id: { type: String, required: true, alias: 'id', default: () => v4() },
  userId: { type: String, required: true, ref: 'User' },
  targetId: { type: String, required: true },
  targetType: { type: String, required: true },
  isUpVote: { type: Boolean, required: true }
});

export default model('Vote', voteSchema);
