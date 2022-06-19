import { model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import PostStats from './PostStatsType'


const PostStatsSchema = new Schema({
  _id: { alias: 'id', type: String, unique: true, default: v4 },
  postId: { type: String, unique: true, ref: "Post" },
  upVotes: { type: Number, default: 0 },
  downVotes: { type: Number, default: 0 }
})

export default model<PostStats>('PostStats', PostStatsSchema)
