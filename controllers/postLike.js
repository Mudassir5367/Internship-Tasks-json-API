const Posts = require('../model/postSchema')



const postLike = async (req, res) => {
  const  postId  = req.body.postId;
  const userId = req.user._id;
  // console.log(userId);

  try {
      const post = await Posts.findOne({postId});
      if (!post) {
          return res.status(404).json({ error: 'Post not found' });
      }

      // Check if the user already liked the post
      const alreadyLiked = post.likes.some(like => like.equals(userId));
      if (alreadyLiked) {
          return res.status(400).json({ error: 'Post already liked by the user' });
      }

      // Add the user's ID to the likes array
      post.likes.push(userId);
      await post.save();

      res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = postLike;
