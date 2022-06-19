import { model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import CommentStats from './CommentStatsType'


const CommentStatsSchema = new Schema({
  _id: { alias: 'id', default: v4, required: true, type: String },
  commentId: { type: String, required: true, ref: "Comment" },
  upVotes: { type: Number, default: 0 },
  downVotes: { type: Number, default: 0 },
})

export default model<CommentStats>("CommmentStats", CommentStatsSchema)
