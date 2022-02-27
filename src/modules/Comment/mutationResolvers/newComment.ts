import { v4 } from 'uuid';
import Comment from '..';
import Post from '../../Post';
import { PostType } from '../../Post/postType';
import { ContextArgs } from '../../shared/Types';
import User from '../../User';
import { user } from '../../User/utils/auth';
import { CommentType, newCommentArgs } from '../commentType';

export default async (
  _: Object,
  args: newCommentArgs,
  context: ContextArgs
) => {
  const { parent, type, post } = args;
  user.validate(context);

  let res: CommentType | PostType | null;

  switch (type) {
    case 'comment':
      res = await Comment.findById(parent);
      break;
    case 'post':
      res = await Post.findById(parent);
      break;
    default:
      throw new Error(`Invalid parent ${type}`);
  }

  const parentPost = await Post.findById(post);
  if (!parentPost) throw new Error(`Invalid post`);

  const commentorProfile = await User.findById(context.user?.id);
  if (!commentorProfile) throw new Error(`Invalid User`);

  const { title } = parentPost;
  const { id, username } = commentorProfile;

  const _id = v4();
  const comment = await Comment.create({
    _id,
    parent: { id: parent, type, title },
    post,
    commentor: { id, username },
  });

  await comment.save();
};
