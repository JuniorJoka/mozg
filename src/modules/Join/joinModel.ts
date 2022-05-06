import { model, Schema } from 'mongoose';
import { JoinType } from './joinType';

const JoinSchema = new Schema({
  _id: { type: 'string', required: true, alias: 'id' },
  communityId: { type: 'string', required: true, ref: 'Community' },
  memberId: { type: 'string', required: true, ref: 'User' },
});

export default model<JoinType>('Join', JoinSchema);
