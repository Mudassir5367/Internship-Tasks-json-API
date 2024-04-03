const Posts = require('../model/postSchema')

const unLikePost =  async (req, res) => {
  const  postId  = req.body.postId;
  const userId = req.user._id;
  console.log(userId,postId);

  try {
      const post = await Posts.findOne(postId);
      if (!post) {
          return res.status(404).json({ error: 'Post not found' });
      }

      // Find the index of the user's ID in the likes array
      const index = post.likes.findIndex(like => like.equals(userId));
      if (index === -1) {
          return res.status(400).json({ error: 'Post not liked by the user' });
      }

      // Remove the user's ID from the likes array
      post.likes.splice(index, 1);
      await post.save();

      res.status(200).json({ message: 'Post unliked successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = unLikePost;