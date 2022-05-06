import { v4 } from 'uuid';
import Comment from '..';
import Post from '../../Post';
import { Context } from '../../../shared/Types';
import User from '../../User';
import { newComment, newCommentArgs } from '../commentType';

export default async (_: {}, args: newCommentArgs, context: Context) => {
  const { parent, type, postId } = args;

  // validate post
  const parentPost = await Post.findById(postId);
  if (!parentPost) throw new Error(`Invalid post`);

  //validate logged in user
  const commentorProfile = await User.findById(context.user?.id);
  if (!commentorProfile) throw new Error(`Invalid User`);

  const { title } = parentPost;
  const { id, username } = commentorProfile;

  // let res: CommentType | PostType | null;
  const valid = await createComment({ ...args, title, id, username });
  if (!valid) throw new Error(`An error occurred while creating comment`);

  // increment comment count if type is comment
  if (type.toLowerCase() === 'comment') {
    await Comment.updateOne({ _id: parent }, { $inc: { commentCount: 1 } });
    // TODO: climb up the parent-comment tree incrementing the comments count by one (ideally in a thread away from main)
  }

  await Post.updateOne({ _id: postId }, { $inc: { commentCount: 1 } });
};

const createComment = async (args: newComment) => {
  const { type, title, postId, comment, id, username, parent } = args;

  const _id = v4();
  const new_comment = await Comment.create({
    _id,
    parent: { id: parent, type, title },
    postId,
    comment,
    commentor: { id, username },
  });

  return await new_comment.save();
};
