const Posts = require('../model/postSchema')


// const updatePost =  async (req, res) => {
//     try {
//       const id = req.params.id;
//       const updatedPost = await Posts.findOneAndUpdate({ id: id }, req.body);
//       if (!updatedPost) {
//         return res.status(404).json({ error: 'Post not found' });
//       }
//       res.status(200).json({ message: 'Post updated successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };


// controllers/updatePost.js


const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id; // Assuming the authenticated user ID is available in req.user

    // Find the post by ID and user ID to ensure ownership
    const updatedPost = await Posts.findOneAndUpdate({ id: postId, users: userId }, req.body, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ error: ' You do not have permission to edit it' });
    }

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = updatePost;


