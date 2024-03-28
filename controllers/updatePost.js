const Posts = require('../model/postSchema')


const updatePost =  async (req, res) => {
    try {
      const id = req.params.id;
      const updatedPost = await Posts.findOneAndUpdate({ id: id }, req.body);
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  module.exports = updatePost;