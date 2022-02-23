import { model, Schema } from 'mongoose';
import { JoinType } from './joinType';

const JoinSchema = new Schema({
  _id: { type: 'string', required: true, alias: 'id' },
  community: { type: 'string', required: true, ref: 'Community' },
  member: { type: 'string', required: true, ref: 'User' },
});

export default model<JoinType>('Join', JoinSchema);
