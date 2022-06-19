import { model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import CommentStats from './CommentStatsType'


const CommentStatsSchema = new Schema({
  _id: { alias: 'id', default: v4, required: true, type: String },
  commentId: { type: String, required: true, ref: "Comment" },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
})

export default model<CommentStats>("CommmentStats", CommentStatsSchema)
