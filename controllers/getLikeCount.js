const Like = require('../model/likePostSchema');
const Posts = require('../model/postSchema')

const getLikeCount = async(req, res)=>{
    try {
            const postId = req.params.postId;
            // Fetch the post from the database
            const post = await Like.find();
            console.log(post);
            if (!post) {
              return res.status(404).json({ message: 'Post not found' });
            }
            // Return the like count for the post
            res.status(200).json({ post});
          } catch (error) {
            console.error('Error fetching like count:', error);
            res.status(500).json({ error: 'Internal server error' });
          }
        
};

module.exports = getLikeCount;