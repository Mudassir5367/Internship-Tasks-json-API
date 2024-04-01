const Like = require('../model/likePostSchema')

const unLikePost = async(req, res)=>{
    try {
        const { postId, userId } = req.params;
        const like = await Like.findOneAndDelete({ postId, userId });
        if (!like) {
          return res.status(404).json({ message: 'Like not found' });
        }
        res.status(200).json({ message: 'Post unliked successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };

  module.exports = unLikePost;