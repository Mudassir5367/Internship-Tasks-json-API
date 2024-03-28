const Posts = require('../model/postSchema')


const deletePost = async (req, res) => {
    try {
      const id = req.params.id;
      const deletedPost = await Posts.findOneAndDelete({ id: id });
      if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports = deletePost;