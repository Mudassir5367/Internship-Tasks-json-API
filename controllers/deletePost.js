const Posts = require('../model/postSchema')


// const deletePost = async (req, res) => {
//     try {
//       const id = req.params.id;
//       const deletedPost = await Posts.findOneAndDelete({ id: id });
//       if (!deletedPost) {
//         return res.status(404).json({ error: 'Post not found' });
//       }
//       res.status(200).json({ message: 'Post deleted successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };


const deletePost = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.status(400).json({ error: 'Invalid request, missing post ID' });
    }
    
    const postId = req.params.id;
    const userId = req.user._id; // Assuming the authenticated user ID is available in req.user

    // Find the post by ID and user ID to ensure ownership
    const deletedPost = await Posts.findOneAndDelete({ id: postId, users: userId });

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found or you do not have permission to delete it' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


  module.exports = deletePost;