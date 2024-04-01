const Like = require('../model/likePostSchema')

const postLike = async(req, res)=>{
    try {
        const { postId, userId } = req.body;
        // console.log(postId, userId);
        const existingLike = await Like.findOne({ postId, userId });
        if (existingLike) {
          return res.status(400).json({ message: 'Post already liked' });
        }
        const like = new Like({ postId, userId });
        await like.save();
        res.status(201).json({ message: 'Post liked successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };

  module.exports = postLike;