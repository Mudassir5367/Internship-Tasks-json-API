const Posts = require('../model/postSchema')

const getAllPosts =  async (req, res) => {
    try {
        // Fetch all posts from the database
        const posts = await Posts.find().sort({ time:-1});
        res.status(200).json(posts);
    } catch (error) {
        console.log('Error fetching posts', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = getAllPosts