import Post from '../../Post';
import { Context } from '../../../shared/Types';
import { newComment } from '../commentType';

export default async (_: {}, args: newComment, context: Context) => {
  const { parentId, parentType, postId } = args;
  const { models, user } = context;

  // validate post
  const parentPost = await models.Post.findById(postId);
  if (!parentPost) throw new Error(`Invalid post`);

  //validate user
  const commentor = await models.User.findById(user?.id);
  if (!commentor) throw new Error(`Invalid User`);

  // validate comment
  if (parentType == 'comment') {
    const comment = await models.Comment.findById(parentId);
    if (!comment) throw new Error(`Invalid Comment`);
  }

  const comment = await models.Comment.create({
    ...args,
    commentorId: commentor.id,
  });
  const valid = await comment.save();
  if (!valid) throw new Error(`An error occurred while creating comment`);

  // increment comment count on "comment" type
  if (parentType === 'comment') {
    await models.Comment.updateOne(
      { _id: parent },
      { $inc: { commentCount: 1 } }
    );
  }
  await Post.updateOne({ _id: postId }, { $inc: { commentCount: 1 } });
};
